// Voice recording with live, on-device transcription (Web Speech API) and an
// optional high-accuracy cloud transcription pass (OpenAI, bring your own key).

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

export const canRecord = !!(navigator.mediaDevices?.getUserMedia && window.MediaRecorder);
export const canLiveTranscribe = !!SpeechRecognition;

function pickMime() {
  const types = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg;codecs=opus', 'audio/ogg'];
  return types.find((t) => MediaRecorder.isTypeSupported?.(t)) || '';
}

/**
 * Starts recording immediately.
 *   onTranscript(finalText, interimText) – live transcript updates
 *   onLevel(0..1)                         – input level for the waveform
 * Call stop() to get { blob, mime, duration, transcript }.
 */
export class Recorder {
  constructor({ lang = navigator.language || 'en-US', onTranscript = () => {}, onLevel = () => {}, liveTranscribe = true } = {}) {
    this.lang = lang;
    this.onTranscript = onTranscript;
    this.onLevel = onLevel;
    this.liveTranscribe = liveTranscribe && canLiveTranscribe;
    this.finalText = '';
    this.interim = '';
    this.chunks = [];
    this.recognitionFailed = false;
  }

  async start() {
    this.stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
    this.mime = pickMime();
    this.media = new MediaRecorder(this.stream, this.mime ? { mimeType: this.mime } : undefined);
    this.mime = this.media.mimeType || this.mime || 'audio/webm';
    this.media.ondataavailable = (e) => e.data.size && this.chunks.push(e.data);
    this.media.start(1000);
    this.startedAt = performance.now();
    this.running = true;
    this.paused = false;
    this.pausedMs = 0;
    this.startMeter();
    if (this.liveTranscribe) this.startRecognition();
  }

  startMeter() {
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new Ctx();
      const src = this.audioCtx.createMediaStreamSource(this.stream);
      const analyser = this.audioCtx.createAnalyser();
      analyser.fftSize = 512;
      src.connect(analyser);
      const buf = new Uint8Array(analyser.fftSize);
      const tick = () => {
        if (!this.running) return;
        analyser.getByteTimeDomainData(buf);
        let sum = 0;
        for (const v of buf) sum += ((v - 128) / 128) ** 2;
        this.onLevel(this.paused ? 0 : Math.min(1, Math.sqrt(sum / buf.length) * 4));
        this.raf = requestAnimationFrame(tick);
      };
      tick();
    } catch { /* metering is cosmetic */ }
  }

  startRecognition() {
    const rec = new SpeechRecognition();
    rec.lang = this.lang;
    rec.continuous = true;
    rec.interimResults = true;
    rec.onresult = (e) => {
      let interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) this.finalText = joinText(this.finalText, r[0].transcript);
        else interim += r[0].transcript;
      }
      this.interim = interim;
      this.onTranscript(this.finalText, interim);
    };
    rec.onerror = (e) => {
      if (e.error === 'not-allowed' || e.error === 'service-not-allowed' || e.error === 'audio-capture') {
        this.recognitionFailed = true;
      }
    };
    // Browsers end recognition after silence; keep it going while we record.
    rec.onend = () => {
      if (this.interim) {
        this.finalText = joinText(this.finalText, this.interim);
        this.interim = '';
        this.onTranscript(this.finalText, '');
      }
      if (this.running && !this.paused && !this.recognitionFailed) {
        try { rec.start(); } catch { /* already started */ }
      }
    };
    try {
      rec.start();
      this.recognition = rec;
    } catch {
      this.recognitionFailed = true;
    }
  }

  pause() {
    if (!this.running || this.paused) return;
    this.media.pause();
    this.paused = true;
    this.pauseStart = performance.now();
    try { this.recognition?.stop(); } catch { /* ignore */ }
  }

  resume() {
    if (!this.running || !this.paused) return;
    this.media.resume();
    this.paused = false;
    this.pausedMs += performance.now() - this.pauseStart;
    try { this.recognition?.start(); } catch { /* ignore */ }
  }

  elapsed() {
    const now = this.paused ? this.pauseStart : performance.now();
    return Math.max(0, (now - this.startedAt - this.pausedMs) / 1000);
  }

  async stop() {
    const duration = this.elapsed();
    this.running = false;
    cancelAnimationFrame(this.raf);
    try { this.recognition?.stop(); } catch { /* ignore */ }
    const done = new Promise((resolve) => { this.media.onstop = resolve; });
    if (this.media.state !== 'inactive') this.media.stop();
    await done;
    this.stream.getTracks().forEach((t) => t.stop());
    try { await this.audioCtx?.close(); } catch { /* ignore */ }
    const transcript = joinText(this.finalText, this.interim).trim();
    return { blob: new Blob(this.chunks, { type: this.mime }), mime: this.mime, duration, transcript };
  }

  cancel() {
    this.running = false;
    cancelAnimationFrame(this.raf);
    try { this.recognition?.abort(); } catch { /* ignore */ }
    try { if (this.media?.state !== 'inactive') this.media.stop(); } catch { /* ignore */ }
    this.stream?.getTracks().forEach((t) => t.stop());
    try { this.audioCtx?.close(); } catch { /* ignore */ }
  }
}

function joinText(a, b) {
  b = (b || '').trim();
  if (!b) return a;
  if (!a) return capitalise(b);
  const needsStop = !/[.!?]$/.test(a.trim());
  return a.trim() + (needsStop ? '. ' : ' ') + capitalise(b);
}

function capitalise(s) {
  return s ? s[0].toUpperCase() + s.slice(1) : s;
}

/** Dictation for a text field: streams words into `onText` until stopped. */
export function dictate({ lang, onText, onEnd }) {
  if (!SpeechRecognition) throw new Error('Speech recognition is not supported in this browser.');
  const rec = new SpeechRecognition();
  rec.lang = lang;
  rec.continuous = true;
  rec.interimResults = true;
  let stopped = false;
  rec.onresult = (e) => {
    for (let i = e.resultIndex; i < e.results.length; i++) {
      if (e.results[i].isFinal) onText(e.results[i][0].transcript.trim());
    }
  };
  rec.onend = () => {
    if (!stopped) {
      try { rec.start(); return; } catch { /* fall through */ }
    }
    onEnd?.();
  };
  rec.onerror = (e) => {
    if (e.error === 'not-allowed' || e.error === 'service-not-allowed') { stopped = true; }
  };
  rec.start();
  return { stop() { stopped = true; rec.stop(); } };
}

/** High-accuracy transcription using OpenAI (user supplies their own key). */
export async function cloudTranscribe(blob, { apiKey, lang }) {
  const ext = blob.type.includes('mp4') ? 'm4a' : blob.type.includes('ogg') ? 'ogg' : 'webm';
  const form = new FormData();
  form.append('file', blob, `note.${ext}`);
  form.append('model', 'whisper-1');
  if (lang) form.append('language', lang.slice(0, 2));
  const res = await fetch('https://api.openai.com/v1/audio/transcriptions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}` },
    body: form,
  });
  if (!res.ok) throw new Error(`Transcription failed (${res.status}): ${(await res.text()).slice(0, 200)}`);
  return (await res.json()).text.trim();
}

export function formatDuration(sec) {
  sec = Math.round(sec || 0);
  const m = Math.floor(sec / 60);
  return `${m}:${String(sec % 60).padStart(2, '0')}`;
}
