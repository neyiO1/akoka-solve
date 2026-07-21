const CACHE_NAME = "akoka-solve-cache-v1";
const OFFLINE_URL = "/dashboard";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        "/",
        OFFLINE_URL,
        "/changemaker.jpg",
        "/lagos_ecosystem.jpg",
        "/csr_funder.jpg"
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // Offline Sync Interception (Step 20 of Integration Plan)
  if (event.request.url.includes("/v1/upload/proof") && event.request.method === "POST") {
    if (!navigator.onLine) {
      // In a real scenario, the client handles the IndexedDB write before the fetch even fires,
      // but the SW can also intercept and queue it via postMessage if needed.
      return event.respondWith(
        new Response(JSON.stringify({ status: "QUEUED_OFFLINE", message: "Network unavailable. Task proof queued locally via CRDT." }), {
          headers: { "Content-Type": "application/json" },
          status: 202
        })
      );
    }
  }

  // Standard Network-First caching strategy for assets
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request).then((response) => {
        if (response) {
          return response;
        }
        if (event.request.mode === "navigate") {
          return caches.match(OFFLINE_URL);
        }
      });
    })
  );
});
