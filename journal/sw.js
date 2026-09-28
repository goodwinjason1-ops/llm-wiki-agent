// Offline support: the app shell is cached; Google APIs always go to the network.
const VERSION = 'daybook-v1';
const SHELL = [
  './',
  'index.html',
  'css/styles.css',
  'js/app.js',
  'js/dates.js',
  'js/db.js',
  'js/gcal.js',
  'js/voice.js',
  'manifest.webmanifest',
  'icons/icon.svg',
  'icons/icon-192.png',
  'icons/icon-512.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  // Never cache Google or OpenAI API traffic.
  if (/googleapis\.com$|accounts\.google\.com$|openai\.com$/.test(url.hostname) && !url.hostname.startsWith('fonts.')) return;

  // Fonts: cache-first.
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(
      caches.match(e.request).then((hit) => hit || fetch(e.request).then((res) => {
        const copy = res.clone();
        caches.open(VERSION).then((c) => c.put(e.request, copy));
        return res;
      })),
    );
    return;
  }

  if (url.origin !== self.location.origin) return;

  // App files: network-first so updates arrive quickly, cache as fallback offline.
  e.respondWith(
    fetch(e.request).then((res) => {
      if (res.ok) {
        const copy = res.clone();
        caches.open(VERSION).then((c) => c.put(e.request, copy));
      }
      return res;
    }).catch(() => caches.match(e.request, { ignoreSearch: true }).then((hit) => hit || caches.match('index.html'))),
  );
});
