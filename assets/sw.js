var cacheName = 'g';
var items = [
    '/?from=sw',
    'manifest.json',
    'images/512.png'
];

self.addEventListener('install', function (e) {
    caches.delete(cacheName).then(
        e.waitUntil(
            caches.open(cacheName).then(function(cache) {
                return cache.addAll(items)
                    .catch(err => caches.delete(cacheName).catch());
            }).then(function() {
                return self.skipWaiting();
            })
        ));
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            return response || fetch(event.request);
        })
    );
});