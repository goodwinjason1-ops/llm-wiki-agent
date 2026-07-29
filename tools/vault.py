"""Shared vault parser for the LLM Wiki.

Zero external dependencies on purpose: these tools have to run on a laptop with a
stock Python and no `pip install` step, because a tool you cannot run is a tool that
does not get run.

Parses the subset of YAML that SCHEMA.md actually specifies (scalars, inline lists,
block lists) rather than pulling in PyYAML for it.
"""

from __future__ import annotations

import datetime as _dt
import re
from dataclasses import dataclass, field
from pathlib import Path

# ---------------------------------------------------------------------------
# SCHEMA.md constants — keep in sync with the document
# ---------------------------------------------------------------------------

EDGE_TYPES = [
    "instance-of",
    "part-of",
    "depends-on",
    "uses",
    "supports",
    "contradicts",
    "supersedes",
    "caused",
    "analogous-to",
    "authored-by",
    "mentioned-in",
]

SYMMETRIC_EDGES = {"contradicts", "analogous-to"}

# folder -> required frontmatter `type` (SCHEMA.md §2)
FOLDER_TYPES = {
    "inbox": "capture",
    "journal": "journal",
    "literature": "source",
    "concepts": "concept",
    "entities": "entity",
    "procedures": "procedure",
    "questions": "question",
    "maps": "map",
}

VALID_TYPES = set(FOLDER_TYPES.values())
VALID_TIERS = {"working", "episodic", "semantic", "procedural"}
VALID_STATUS = {"active", "draft", "superseded", "archived"}

# tier -> half-life in days (SCHEMA.md §4)
TIER_HALFLIFE = {
    "working": 7,
    "episodic": 90,
    "semantic": 365,
    "procedural": 365,
}

TIER_ORDER = ["working", "episodic", "semantic", "procedural"]

# ---------------------------------------------------------------------------
# Regexes
# ---------------------------------------------------------------------------

_FRONTMATTER_RE = re.compile(r"\A---\r?\n(.*?)\r?\n---\s*?\r?\n", re.DOTALL)
# [[Target]], [[Target|Alias]], [[Target#Heading]], ![[Embed]]
_WIKILINK_RE = re.compile(r"!?\[\[([^\]\[|#^]+)(?:[#^][^\]\[|]*)?(?:\|[^\]\[]*)?\]\]")
# `edge-type:: [[Target]]` in list, prose, or parenthesised Dataview form
_TYPED_EDGE_RE = re.compile(
    r"(?<![\w-])(" + "|".join(EDGE_TYPES) + r")\s*::\s*(.+?)(?:\n|$)"
)
_CONF_RE = re.compile(r"\^conf:([01](?:\.\d+)?)")
_SOURCE_REF_RE = re.compile(r"source:\s*`([^`]+)`|source:\s*(\S+)")
# SCHEMA.md §7 allows a claim to be marked as the author's own reasoning instead of
# carrying a source. These count as provenance; a bare unmarked claim does not.
_INFERENCE_RE = re.compile(
    r"\b(own inference|first-hand|firsthand|inferred from|own reasoning|unverified|unconfirmed)\b",
    re.IGNORECASE,
)
_TAG_INLINE_RE = re.compile(r"(?<![\w&/#])#([A-Za-z][\w/-]*)")


def _norm(name: str) -> str:
    """Normalise a link target or title into a comparison key."""
    return re.sub(r"\s+", " ", name).strip().lower()


# ---------------------------------------------------------------------------
# Frontmatter
# ---------------------------------------------------------------------------


def parse_frontmatter(text: str) -> tuple[dict, str, bool]:
    """Return (metadata, body, had_frontmatter)."""
    m = _FRONTMATTER_RE.match(text)
    if not m:
        return {}, text, False

    meta: dict = {}
    key: str | None = None
    for raw in m.group(1).splitlines():
        if not raw.strip() or raw.lstrip().startswith("#"):
            continue

        # block-list continuation:  "  - value"
        stripped = raw.strip()
        if stripped.startswith("- ") and key is not None:
            meta.setdefault(key, [])
            if isinstance(meta[key], list):
                meta[key].append(_scalar(stripped[2:]))
            continue

        if ":" not in raw:
            continue

        k, _, v = raw.partition(":")
        key = k.strip()
        v = v.strip()

        if v == "":
            meta[key] = []  # expect a block list to follow
        elif v.startswith("[") and v.endswith("]"):
            inner = v[1:-1].strip()
            meta[key] = [_scalar(p) for p in _split_inline(inner)] if inner else []
        else:
            meta[key] = _scalar(v)

    return meta, text[m.end():], True


def _split_inline(inner: str) -> list[str]:
    """Split `a, b, [[c, d]]` on commas that are not inside brackets or quotes."""
    parts, buf, depth, quote = [], [], 0, ""
    for ch in inner:
        if quote:
            if ch == quote:
                quote = ""
            buf.append(ch)
        elif ch in "\"'":
            quote = ch
            buf.append(ch)
        elif ch in "[(":
            depth += 1
            buf.append(ch)
        elif ch in "])":
            depth -= 1
            buf.append(ch)
        elif ch == "," and depth == 0:
            parts.append("".join(buf))
            buf = []
        else:
            buf.append(ch)
    if buf:
        parts.append("".join(buf))
    return [p for p in (p.strip() for p in parts) if p]


def _scalar(v: str):
    v = v.strip()
    if len(v) >= 2 and v[0] == v[-1] and v[0] in "\"'":
        return v[1:-1]
    low = v.lower()
    if low in ("null", "~", "none", ""):
        return None
    if low == "true":
        return True
    if low == "false":
        return False
    try:
        return int(v)
    except ValueError:
        pass
    try:
        return float(v)
    except ValueError:
        pass
    return v


# ---------------------------------------------------------------------------
# Note model
# ---------------------------------------------------------------------------


@dataclass
class Note:
    path: Path
    rel: str
    stem: str
    folder: str
    meta: dict
    body: str
    has_frontmatter: bool

    links: list[str] = field(default_factory=list)          # raw wikilink targets
    typed: list[tuple[str, str, str]] = field(default_factory=list)  # (edge, target, note)
    claims: list[dict] = field(default_factory=list)
    inline_tags: list[str] = field(default_factory=list)

    # resolved during Vault.build()
    node_id: str = ""
    out_ids: set[str] = field(default_factory=set)
    in_ids: set[str] = field(default_factory=set)

    # -- convenience accessors -------------------------------------------------

    @property
    def title(self) -> str:
        t = self.meta.get("title")
        return t if isinstance(t, str) and t.strip() else self.stem

    @property
    def type(self) -> str:
        t = self.meta.get("type")
        return t if isinstance(t, str) else FOLDER_TYPES.get(self.folder, "concept")

    @property
    def tier(self) -> str:
        t = self.meta.get("tier")
        return t if t in VALID_TIERS else "episodic"

    @property
    def status(self) -> str:
        s = self.meta.get("status")
        return s if s in VALID_STATUS else "active"

    @property
    def confidence(self) -> float:
        c = self.meta.get("confidence")
        if isinstance(c, (int, float)):
            return max(0.0, min(1.0, float(c)))
        return 0.5

    @property
    def tags(self) -> list[str]:
        raw = self.meta.get("tags") or []
        if isinstance(raw, str):
            raw = [raw]
        out = [str(t).lstrip("#") for t in raw if t]
        for t in self.inline_tags:
            if t not in out:
                out.append(t)
        return out

    @property
    def aliases(self) -> list[str]:
        raw = self.meta.get("aliases") or []
        if isinstance(raw, str):
            raw = [raw]
        return [str(a) for a in raw if a]

    @property
    def sources(self) -> list[str]:
        raw = self.meta.get("sources") or []
        if isinstance(raw, str):
            raw = [raw]
        return [str(s) for s in raw if s]

    def date(self, field_name: str):
        v = self.meta.get(field_name)
        if v is None:
            return None
        s = str(v).strip()
        for fmt in ("%Y-%m-%d", "%Y/%m/%d", "%d-%m-%Y"):
            try:
                return _dt.datetime.strptime(s[:10], fmt).date()
            except ValueError:
                continue
        return None

    @property
    def days_since_review(self) -> int | None:
        d = self.date("reviewed") or self.date("updated") or self.date("created")
        if d is None:
            return None
        return (_dt.date.today() - d).days

    @property
    def is_stale(self) -> bool:
        n = self.days_since_review
        return n is not None and n > TIER_HALFLIFE.get(self.tier, 365)

    @property
    def degree(self) -> int:
        return len(self.out_ids | self.in_ids)


# ---------------------------------------------------------------------------
# Body extraction
# ---------------------------------------------------------------------------


def _strip_fences(text: str) -> str:
    """Blank out fenced blocks, preserving line count."""
    text = re.sub(r"```.*?```", lambda m: "\n" * m.group(0).count("\n"), text, flags=re.DOTALL)
    return re.sub(r"~~~.*?~~~", lambda m: "\n" * m.group(0).count("\n"), text, flags=re.DOTALL)


def _strip_code(text: str) -> str:
    """Also blank inline code, so examples in prose can't emit phantom links or tags."""
    return re.sub(r"`[^`\n]*`", "", _strip_fences(text))


def extract(note: Note) -> None:
    clean = _strip_code(note.body)
    # Claims keep their inline code: `source: `sources/x.md`` is the provenance marker.
    claim_text = _strip_fences(note.body)

    note.links = [m.group(1).strip() for m in _WIKILINK_RE.finditer(clean)]
    note.inline_tags = sorted({m.group(1) for m in _TAG_INLINE_RE.finditer(clean)})

    for m in _TYPED_EDGE_RE.finditer(clean):
        edge, rest = m.group(1), m.group(2).strip()
        targets = _WIKILINK_RE.findall(rest)
        if not targets:
            continue
        # everything after the first link, minus a leading em/en dash, is the reason
        tail = _WIKILINK_RE.sub("", rest).strip()
        tail = re.sub(r"^[\s\-—–:,)]+", "", tail).rstrip(")").strip()
        for t in targets:
            note.typed.append((edge, t.strip(), tail))

    section = ""
    for line in claim_text.splitlines():
        s = line.strip()
        if s.startswith("#"):
            section = s.lstrip("# ").strip().lower()
            continue
        # Links, questions and provenance lists are navigation, not assertions.
        if section in ("links", "open questions", "provenance", "related", "contradictions"):
            continue
        if not s.startswith(("- ", "* ")) or "::" in s:
            continue
        body = s[2:].strip()
        if body.startswith(("[[", "[ ]", "[x]")):
            continue
        conf = _CONF_RE.search(s)
        src = _SOURCE_REF_RE.search(s)
        text = _CONF_RE.sub("", body).strip()
        if len(text) < 12:
            continue
        note.claims.append(
            {
                "text": text,
                "confidence": float(conf.group(1)) if conf else None,
                "source": (src.group(1) or src.group(2)) if src else None,
                "inferred": bool(_INFERENCE_RE.search(s)),
            }
        )


# ---------------------------------------------------------------------------
# Vault
# ---------------------------------------------------------------------------


class Vault:
    def __init__(self, root: Path):
        self.root = Path(root).resolve()
        self.wiki_dir = self.root / "wiki"
        self.sources_dir = self.root / "sources"
        self.notes: list[Note] = []
        self.by_id: dict[str, Note] = {}
        self._index: dict[str, Note] = {}   # normalised name -> note
        self.broken: list[tuple[Note, str]] = []

    # -- loading ---------------------------------------------------------------

    def load(self) -> "Vault":
        if not self.wiki_dir.is_dir():
            raise SystemExit(f"No wiki/ directory found at {self.wiki_dir}")

        for path in sorted(self.wiki_dir.rglob("*.md")):
            # `_templates`, `_attachments` and dotfolders are scaffolding, not knowledge
            if any(p.startswith((".", "_")) for p in path.relative_to(self.wiki_dir).parts):
                continue
            try:
                text = path.read_text(encoding="utf-8")
            except (OSError, UnicodeDecodeError):
                continue

            meta, body, had = parse_frontmatter(text)
            rel = path.relative_to(self.root).as_posix()
            parts = path.relative_to(self.wiki_dir).parts
            folder = parts[0] if len(parts) > 1 else "_root"

            note = Note(
                path=path, rel=rel, stem=path.stem, folder=folder,
                meta=meta, body=body, has_frontmatter=had,
            )
            note.node_id = rel
            extract(note)
            self.notes.append(note)
            self.by_id[note.node_id] = note

        self._build_index()
        self._resolve()
        return self

    def _build_index(self) -> None:
        for n in self.notes:
            for key in {_norm(n.stem), _norm(n.title)}:
                self._index.setdefault(key, n)
        # aliases resolve at lower priority than real filenames
        for n in self.notes:
            for a in n.aliases:
                self._index.setdefault(_norm(a), n)

    def resolve(self, target: str) -> Note | None:
        t = target.strip()
        hit = self._index.get(_norm(t))
        if hit is not None:
            return hit
        # tolerate path-style links such as [[concepts/Some Note]]
        return self._index.get(_norm(t.rsplit("/", 1)[-1].removesuffix(".md")))

    def _resolve(self) -> None:
        for n in self.notes:
            targets = list(n.links) + [t for _, t, _ in n.typed]
            for raw in targets:
                hit = self.resolve(raw)
                if hit is None:
                    self.broken.append((n, raw))
                elif hit is not n:
                    n.out_ids.add(hit.node_id)
                    hit.in_ids.add(n.node_id)

    # -- graph -----------------------------------------------------------------

    def edges(self) -> list[dict]:
        """Deduplicated edge list. Typed edges win over plain wikilinks."""
        best: dict[tuple[str, str], dict] = {}

        def put(src: Note, dst: Note, kind: str, note: str) -> None:
            key = (src.node_id, dst.node_id)
            existing = best.get(key)
            if existing and existing["type"] != "links-to":
                return  # already typed; don't downgrade
            best[key] = {
                "source": src.node_id, "target": dst.node_id,
                "type": kind, "note": note,
            }

        for n in self.notes:
            for edge, raw, why in n.typed:
                hit = self.resolve(raw)
                if hit and hit is not n:
                    put(n, hit, edge, why)
            for raw in n.links:
                hit = self.resolve(raw)
                if hit and hit is not n:
                    put(n, hit, "links-to", "")

        # collapse symmetric pairs so the galaxy draws one line, not two
        out, seen = [], set()
        for e in best.values():
            if e["type"] in SYMMETRIC_EDGES:
                pair = (frozenset((e["source"], e["target"])), e["type"])
                if pair in seen:
                    continue
                seen.add(pair)
            out.append(e)
        return out

    def orphans(self) -> list[Note]:
        return [n for n in self.notes if not n.in_ids and n.folder != "_root"]

    def sinks(self) -> list[Note]:
        return [n for n in self.notes if not n.out_ids and n.folder != "_root"]

    def clusters(self) -> list[list[Note]]:
        """Connected components, largest first."""
        seen: set[str] = set()
        comps: list[list[Note]] = []
        for n in self.notes:
            if n.node_id in seen:
                continue
            stack, comp = [n.node_id], []
            seen.add(n.node_id)
            while stack:
                cur = self.by_id[stack.pop()]
                comp.append(cur)
                for nb in cur.out_ids | cur.in_ids:
                    if nb not in seen:
                        seen.add(nb)
                        stack.append(nb)
            comps.append(comp)
        return sorted(comps, key=len, reverse=True)

    def source_files(self) -> list[Path]:
        if not self.sources_dir.is_dir():
            return []
        skip = {".gitkeep", "README.md"}
        return [
            p for p in sorted(self.sources_dir.rglob("*"))
            if p.is_file() and p.name not in skip and not p.name.startswith(".")
        ]

    def unreferenced_sources(self) -> list[Path]:
        cited = set()
        for n in self.notes:
            for s in n.sources:
                cited.add(Path(s).name.lower())
            for c in n.claims:
                if c["source"]:
                    cited.add(Path(c["source"]).name.lower())
        return [p for p in self.source_files() if p.name.lower() not in cited]


def find_root(start: Path | None = None) -> Path:
    """Walk up from `start` looking for the vault root."""
    cur = (start or Path(__file__).resolve().parent).resolve()
    for candidate in [cur, *cur.parents]:
        if (candidate / "wiki").is_dir() and (candidate / "SCHEMA.md").is_file():
            return candidate
    return cur
