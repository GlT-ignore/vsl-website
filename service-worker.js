const CACHE_NAME = 'vsl-cache-v2-2026-04-15';
const OFFLINE_URL = '/404.html';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  OFFLINE_URL,
  '/css/style.css',
  '/js/main.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
  );
});

self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(OFFLINE_URL))
    );
    return;
  }
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
