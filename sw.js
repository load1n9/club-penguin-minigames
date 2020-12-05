const PRECACHE_URLS =
`manifest.json
./index.js
./data.js
./index.html
./icefishing/title.swf
./icefishing/bootstrap.swf
./icefishing/index.html
./icefishing/canoworms.swf
./icefishing/IceFishing.swf
./icefishing/lang/en/locale.swf
./src/7a7b47acdad52ed286ce.module.wasm
./src/core.ruffle.75408f40d9423287edd6.js
./src/ruffle.js.map
./src/ruffle.js
./src/core.ruffle.75408f40d9423287edd6.js.map
./dancecontest/index.html
./dancecontest/dance.swf
./dancecontest/lang/en/locale.swf
./dancecontest/songs/songData2.swf
./dancecontest/songs/songData4.swf
./dancecontest/songs/songData1.swf
./dancecontest/songs/songData6.swf
./dancecontest/songs/songData5.swf
./dancecontest/songs/songData3.swf`
.replace(/(\r\n|\n|\r)/gm, "").split("./")

const PRECACHE = 'precache-v2';
const RUNTIME = 'runtime';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});


self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(RUNTIME).then(cache => {
          return fetch(event.request).then(response => {
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      })
    );
  }
});
