const CACHE_NAME = "to-do-pwa-cache-v1";
const selfUrl = new URL(self.location);
const BASE_URL =
  selfUrl.origin + selfUrl.pathname.replace("/service-worker.js", "");

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
      console.log("Opening cache and adding files:", FILES_TO_CACHE);
      return cache.addAll(FILES_TO_CACHE).catch((error) => {
        console.error("Failed to cache files:", error);
        // Log each file's fetch status
        FILES_TO_CACHE.forEach(async (file) => {
          try {
            const response = await fetch(file);
            if (!response.ok) {
              console.error("File not found or cannot be fetched:", file);
            }
          } catch (fetchError) {
            console.error("Fetch error for file:", file, fetchError);
          }
        });
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
