const CACHE_NAME = `jiit-shelf-${Date.now()}`;
const urlsToCache = [
  "/",
  "/index.html",
  "/subjects.html",
  "/material.html",
  "/cgest.html",
  "/cgcalc.html",
  "/manifest.json",
  "/css/responsive.css",
  "/css/style.css",
  "/js/cgCalc.js",
  "/js/cgEst.js",
  "/js/countdown.js",
  "/js/data.js",
  "/js/index.js",
  "/js/main.js",
  "/js/material.js",
  "/js/subjects.js",

  "/icons/favicon.svg",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
];


self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});


self.addEventListener("activate", (event) => {
  self.clients.claim();
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) return caches.delete(cache);
        })
      )
    )
  );
});


self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  if (urlsToCache.includes(url.pathname)) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        return cached || fetch(event.request);
      })
    );
    return;
  }


  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, clone);
          });
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
