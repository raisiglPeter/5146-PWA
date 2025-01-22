const CACHE_NAME = "to-do-pwa-cache-v1";
const FILES_TO_CACHE = [
  `${BASE_URL}/`,
  `${BASE_URL}/index.html`,
  `${BASE_URL}/style.css`,
  `${BASE_URL}/app.js`,
  `${BASE_URL}/manifest.json`,
  `${BASE_URL}/icons/icon-128.png`,
  `${BASE_URL}/icons/icon-512.png`,
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
