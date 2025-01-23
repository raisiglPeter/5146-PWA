const CACHE_NAME = "to-do-pwa-cache-v1";
const FILES_TO_CACHE = [
  "/5146-PWA/", // This caches the root itself
  "/5146-PWA/index.html",
  "/5146-PWA/style.css",
  "/5146-PWA/app.js", // Or whatever Parcel outputs for your JS
  "/5146-PWA/manifest.json",
  "/5146-PWA/icons/icon-128.png",
  "/5146-PWA/icons/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Opened cache:", CACHE_NAME);
        cache
          .addAll(FILES_TO_CACHE)
          .then(() => {
            console.log("Caching files:", FILES_TO_CACHE);
          })
          .catch((error) => {
            console.error("Failed to cache files:", error);
          });
      })
      .catch((error) => {
        console.error("Failed to open cache:", error);
      })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
