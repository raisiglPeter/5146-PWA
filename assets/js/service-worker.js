const CACHE_NAME = "recipe-list-cache-v1";
const FILES_TO_CACHE = [
  "/5146-PWA/",
  "/5146-PWA/html/index.html",
  "/5146-PWA/html/recipes.html",
  "/5146-PWA/assets/css/style.css",
  "/5146-PWA/assets/css/style-sign-in.css",
  "/5146-PWA/js/firebase.js",
  "/5146-PWA/js/recipes.js",
  "/5146-PWA/js/signIn.js",
  "/5146-PWA/js/service-worker.js",
  "/5146-PWA/manifest.json",
  "/5146-PWA/icons/favicon.ico",
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
