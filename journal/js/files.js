// Photos, videos and other files attached to a day. Originals are kept as-is;
// a small JPEG thumbnail is generated for grids and the calendar.

import { db, uid } from './db.js';

const THUMB = 480;

export function kindOf(file) {
  const t = file.type || '';
  if (t.startsWith('image/')) return 'image';
  if (t.startsWith('video/')) return 'video';
  if (t.startsWith('audio/')) return 'audio';
  if (t === 'application/pdf') return 'pdf';
  if (/\.(heic|heif)$/i.test(file.name || '')) return 'image';
  return 'file';
}

function canvasToBlob(canvas) {
  return new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.8));
}

function drawCover(source, w, h) {
  const scale = Math.min(1, THUMB / Math.max(w, h));
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(w * scale));
  canvas.height = Math.max(1, Math.round(h * scale));
  canvas.getContext('2d').drawImage(source, 0, 0, canvas.width, canvas.height);
  return canvas;
}

async function imageThumb(blob) {
  try {
    const bmp = await createImageBitmap(blob, { imageOrientation: 'from-image' });
    const c = drawCover(bmp, bmp.width, bmp.height);
    const meta = { width: bmp.width, height: bmp.height };
    bmp.close?.();
    return { thumb: await canvasToBlob(c), ...meta };
  } catch {
    // Fallback via <img> (e.g. Safari with HEIC).
    const url = URL.createObjectURL(blob);
    try {
      const img = await new Promise((resolve, reject) => {
        const i = new Image();
        i.onload = () => resolve(i);
        i.onerror = reject;
        i.src = url;
      });
      const c = drawCover(img, img.naturalWidth, img.naturalHeight);
      return { thumb: await canvasToBlob(c), width: img.naturalWidth, height: img.naturalHeight };
    } catch {
      return {};
    } finally {
      URL.revokeObjectURL(url);
    }
  }
}

function videoThumb(blob) {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(blob);
    const v = document.createElement('video');
    v.muted = true;
    v.playsInline = true;
    v.preload = 'metadata';
    let done = false;
    const finish = (res) => {
      if (done) return;
      done = true;
      URL.revokeObjectURL(url);
      resolve(res);
    };
    setTimeout(() => finish({}), 5000);
    v.onloadedmetadata = () => { v.currentTime = Math.min(0.5, (v.duration || 1) / 3); };
    v.onseeked = async () => {
      try {
        const c = drawCover(v, v.videoWidth, v.videoHeight);
        finish({ thumb: await canvasToBlob(c), width: v.videoWidth, height: v.videoHeight, duration: v.duration });
      } catch { finish({ duration: v.duration }); }
    };
    v.onerror = () => finish({});
    v.src = url;
  });
}

/** Store files against a date. Returns the saved records. */
export async function addFiles(date, fileList, { onProgress } = {}) {
  const saved = [];
  const list = [...fileList];
  for (let i = 0; i < list.length; i++) {
    const file = list[i];
    onProgress?.(i, list.length, file.name);
    const kind = kindOf(file);
    let meta = {};
    if (kind === 'image') meta = await imageThumb(file);
    else if (kind === 'video') meta = await videoThumb(file);
    const rec = {
      id: uid(),
      date,
      name: file.name || `${kind}-${Date.now()}`,
      type: file.type || 'application/octet-stream',
      size: file.size,
      kind,
      blob: file,
      thumb: meta.thumb || null,
      width: meta.width || null,
      height: meta.height || null,
      duration: meta.duration || null,
      caption: '',
      createdAt: new Date().toISOString(),
      takenAt: file.lastModified ? new Date(file.lastModified).toISOString() : null,
    };
    await db.put('files', rec);
    saved.push(rec);
  }
  return saved;
}

export function formatBytes(n) {
  if (!n) return '0 B';
  const u = ['B', 'KB', 'MB', 'GB'];
  const i = Math.min(u.length - 1, Math.floor(Math.log(n) / Math.log(1024)));
  return `${(n / 1024 ** i).toFixed(i ? 1 : 0)} ${u[i]}`;
}

export const FILE_EMOJI = { image: '🖼️', video: '🎬', audio: '🎵', pdf: '📄', file: '📎' };
