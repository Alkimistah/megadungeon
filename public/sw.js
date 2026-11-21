const BUILD_ID = "dev";
const PRECACHE = [];
const CACHE_NAME = `mega-dungeon-${BUILD_ID}`;
const BASE_URL = new URL(self.registration.scope).pathname;
const ASSETS = [BASE_URL, BASE_URL + "index.html", BASE_URL + "manifest.webmanifest"];

self.addEventListener("install", (event) => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll([...ASSETS, ...PRECACHE.map((p) => BASE_URL + p)].map((u) => new Request(u, { cache: "reload" }))))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => caches.delete(cacheName))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        const responseToCache = networkResponse.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      })
      // O hosting/preview envia Vary: Origin; o pré-cache guarda sem Origin, então o match precisa ignorar o Vary.
      .catch(() => caches.match(event.request, { ignoreVary: true }))
  );
});
