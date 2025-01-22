const CACHE_NAME = "to-do-pwa-cache-v1";
const FILES_TO_CACHE = [
  "/5146-PWA/",
  "/5146-PWA/index.html",
  "/5146-PWA/style.css",
  "/5146-PWA/app.js",
  "/5146-PWA/manifest.json",
  "/5146-PWA/icons/icon-128.png",
  "/5146-PWA/icons/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE).catch((error) => {
        console.error("Failed to cache files:", error);
        for (const file of FILES_TO_CACHE) {
          fetch(file)
            .then((response) => {
              if (!response.ok) {
                console.error("File not found:", file);
              }
            })
            .catch((error) => {
              console.error("Fetch error for file:", file, error);
            });
        }
      });
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
