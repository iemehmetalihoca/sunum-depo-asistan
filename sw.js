/* Ceyhan Depo Tablet · çevrimdışı önbellek (1.0.303.3 · GitHub yayını) */
const CACHE = "ceyhan-tablet-1.0.303.3-gh-20261115225740";
const ASSETS = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./paket.json"];
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key.startsWith("ceyhan-tablet-") && key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});
self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  // paket.json: önce internet (GitHub'daki güncel liste hemen gelsin), yoksa önbellek.
  if (url.pathname.endsWith("/paket.json")) {
    event.respondWith(
      fetch(request, { cache: "no-store" })
        .then((response) => {
          if (response && response.ok) caches.open(CACHE).then((cache) => cache.put("./paket.json", response.clone()));
          return response;
        })
        .catch(() => caches.open(CACHE).then((cache) => cache.match("./paket.json")).then((cached) => cached || new Response("", { status: 504 }))),
    );
    return;
  }
  // Ekranın kendisi: önce önbellek (depoda zayıf Wi-Fi'de anında açılır), arkada güncelle; yeni sürüm bir sonraki açılışta gelir.
  const key = request.mode === "navigate" ? "./index.html" : request;
  event.respondWith(
    caches.open(CACHE).then((cache) =>
      cache.match(key).then((cached) => {
        const network = fetch(request)
          .then((response) => {
            if (response && response.ok) cache.put(key, response.clone());
            return response;
          })
          .catch(() => cached);
        return cached || network;
      }),
    ),
  );
});
