// Cache
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('cache').then(function(cache) {
      return cache.addAll([ './index.html' ]);
    })
   );
});

// Get cache
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request).then(function(response) {
        // Return cached response if found, otherwise a fallback Response
        return response || new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
      });
    })
  );
});