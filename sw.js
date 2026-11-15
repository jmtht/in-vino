// In Vino - service worker : l'app fonctionne hors-ligne.
// Les appels à api.github.com ne sont jamais mis en cache.
const CACHE = "invino-v15";
const SHELL = [
  "./", "./index.html", "./manifest.webmanifest", "./vignobles.js",
  "./son-bouchon.mp3", "./son-service.mp3", "./son-tchin.mp3",
  "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png",
  "./instrument-serif-400-normal.woff2", "./instrument-serif-400-italic.woff2",
  "./pinyon-script-400-normal.woff2", "./jetbrains-mono-400-normal.woff2",
  "./cormorant-garamond-400-normal.woff2", "./cormorant-garamond-400-italic.woff2",
  "./cormorant-garamond-500-normal.woff2", "./cormorant-garamond-500-italic.woff2"
];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin) return;
  // Réseau d'abord pour la page (pour recevoir les mises à jour), cache sinon.
  if (e.request.mode === "navigate") {
    e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open(CACHE).then(ca => ca.put("./index.html", c)); return r; })
      .catch(() => caches.match("./index.html")));
    return;
  }
  e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request).then(r => {
    if (r.ok) { const c = r.clone(); caches.open(CACHE).then(ca => ca.put(e.request, c)); }
    return r;
  })));
});

// Toucher une notification ouvre (ou ramène) l'app
self.addEventListener("notificationclick", e => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(list => {
    for (const c of list) { if ("focus" in c) return c.focus(); }
    return self.clients.openWindow("./");
  }));
});
