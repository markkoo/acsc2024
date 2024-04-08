self.addEventListener('install', event => self.skipWaiting());

self.addEventListener('activate', event => {
  caches.keys().then(cacheNames => { for (let name of cacheNames) { caches.delete(name); } });

  self.registration.unregister()
    .then(() => self.clients.matchAll())
    .then((clients) => clients.forEach(client => client.navigate(client.url)))

});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    fetch(event.request).catch(function () {
      return caches.match(event.request);
    }),
  );
});