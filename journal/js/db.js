// IndexedDB storage. Everything stays on this device unless you sync it to Google.

const DB_NAME = 'daybook';
const DB_VERSION = 1;
let dbPromise;

function open() {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains('entries')) db.createObjectStore('entries', { keyPath: 'date' });
      if (!db.objectStoreNames.contains('tasks')) {
        const s = db.createObjectStore('tasks', { keyPath: 'id' });
        s.createIndex('date', 'date');
      }
      if (!db.objectStoreNames.contains('voice')) {
        const s = db.createObjectStore('voice', { keyPath: 'id' });
        s.createIndex('date', 'date');
      }
      if (!db.objectStoreNames.contains('kv')) db.createObjectStore('kv');
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  return dbPromise;
}

function wrap(req) {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function store(name, mode = 'readonly') {
  const db = await open();
  return db.transaction(name, mode).objectStore(name);
}

export const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

export const db = {
  async get(name, key) {
    return wrap((await store(name)).get(key));
  },
  async all(name) {
    return wrap((await store(name)).getAll());
  },
  async byDate(name, date) {
    return wrap((await store(name)).index('date').getAll(date));
  },
  async byDateRange(name, from, to) {
    return wrap((await store(name)).index('date').getAll(IDBKeyRange.bound(from, to)));
  },
  async put(name, value) {
    await wrap((await store(name, 'readwrite')).put(value));
    return value;
  },
  async delete(name, key) {
    return wrap((await store(name, 'readwrite')).delete(key));
  },
  async clear(name) {
    return wrap((await store(name, 'readwrite')).clear());
  },
  async getKV(key, fallback) {
    const v = await wrap((await store('kv')).get(key));
    return v === undefined ? fallback : v;
  },
  async setKV(key, value) {
    return wrap((await store('kv', 'readwrite')).put(value, key));
  },
};

// Ask the browser not to evict our data under storage pressure.
export async function requestPersistence() {
  try {
    if (navigator.storage?.persist && !(await navigator.storage.persisted())) await navigator.storage.persist();
  } catch { /* not supported */ }
}

// --- Backup ---------------------------------------------------------------

function blobToDataURL(blob) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = () => reject(r.error);
    r.readAsDataURL(blob);
  });
}

async function dataURLToBlob(url) {
  return (await fetch(url)).blob();
}

export async function exportAll() {
  const [entries, tasks, voiceRaw, settings] = await Promise.all([
    db.all('entries'), db.all('tasks'), db.all('voice'), db.getKV('settings', {}),
  ]);
  const voice = await Promise.all(voiceRaw.map(async (v) => ({ ...v, blob: v.blob ? await blobToDataURL(v.blob) : null })));
  // Never put the API key in a backup file.
  const { openaiKey, ...safeSettings } = settings || {};
  return { app: 'daybook', version: 1, exportedAt: new Date().toISOString(), entries, tasks, voice, settings: safeSettings };
}

export async function importAll(data) {
  if (!data || data.app !== 'daybook') throw new Error('This file is not a Daybook backup.');
  for (const e of data.entries || []) await db.put('entries', e);
  for (const t of data.tasks || []) await db.put('tasks', t);
  for (const v of data.voice || []) await db.put('voice', { ...v, blob: v.blob ? await dataURLToBlob(v.blob) : null });
  return { entries: data.entries?.length || 0, tasks: data.tasks?.length || 0, voice: data.voice?.length || 0 };
}
