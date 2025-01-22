const e = [
  "/",
  "/index.html",
  "/style.css",
  "/app.js",
  "/manifest.json",
  "/icons/icon-128.png",
  "/icons/icon-512.png",
];
self.addEventListener("install", (t) => {
  t.waitUntil(
    caches.open("to-do-pwa-cache-v1").then((t) =>
      t.addAll(e).catch((t) => {
        for (let o of (console.error("Failed to cache files:", t), e))
          fetch(o)
            .then((e) => {
              e.ok || console.error("File not found:", o);
            })
            .catch((e) => {
              console.error("Fetch error for file:", o, e);
            });
      })
    )
  );
}),
  self.addEventListener("fetch", (e) => {
    e.respondWith(caches.match(e.request).then((t) => t || fetch(e.request)));
  });
//# sourceMappingURL=service-worker.2fa21512.js.map
