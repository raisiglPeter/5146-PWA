const CACHE_NAME = "my-recipe-organizer";
const FILES_TO_CACHE = [
  "/5146-PWA/",
  "/5146-PWA/index.html",
  "/5146-PWA/style.css",
  "/5146-PWA/script.js",
  "/5146-PWA/manifest.json",
  "/5146-PWA/icons/icon-128.png",
  "/5146-PWA/icons/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
