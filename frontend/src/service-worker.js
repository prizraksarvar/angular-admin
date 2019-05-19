//importScripts('/cache-polyfill.js');

const CACHE_NAME = 'v0.0.1';
// Listen for install event, set callback
self.addEventListener('install', function(event) {
  console.log('install',event);
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll([
        '/',
        '/animtest',
        '/vendor.js',
        '/styles.js',
        '/scripts.js',
        '/runtime.js',
        '/polyfills.js',
        '/main.js',
        '/index.html',
        '/es2015-polyfills.js',
        '/service-worker.js',
        '/assets/service-worker.js',
        '/assets/install.js',
        '/assets/manifest.json',
        '/assets/avatar-neytiri.jpg'
      ]).then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', event => {
  console.log("activate",event);
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  console.log(event.request.url);
  event.respondWith(
    caches.open(CACHE_NAME)
      .then(cache => cache.match(event.request, {ignoreSearch: true}))
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

/*self.addEventListener('fetch', (event) => {
    console.log('fetch',event);
    if (event.request.method === 'GET') {
        event.respondWith(
            caches.match(event.request)
                .then((cached) => {
                    var networked = fetch(event.request)
                        .then((response) => {
                            let cacheCopy = response.clone()
                            caches.open(CACHE_NAME)
                                .then(cache => cache.put(event.request, cacheCopy))
                            return response;
                        })
                        .catch(() => caches.match(offlinePage));
                    return cached || networked;
                })
        )
    }
    return;
});*/

/*self.addEventListener('fetch', function(event) {
    event.respondWith(caches.match(event.request).then(function(response) {
        // caches.match() always resolves
        // but in case of success response will have value
        if (response !== undefined) {
            return response;
        } else {
            return fetch(event.request).then(function (response) {
                // response may be used only once
                // we need to save clone to put one copy in cache
                // and serve second one
                let responseClone = response.clone();

                caches.open('v1').then(function (cache) {
                    cache.put(event.request, responseClone);
                });
                return response;
            }).catch(function () {
                return caches.match('/index.html');
            });
        }
    }));
});*/
