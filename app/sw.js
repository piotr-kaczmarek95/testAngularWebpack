var CACHE_NAME = 'hw-project-cache';
var urlsToCache = [

  '/',

  'dist/bundle.js',
  'index.html',
 
  'lib/html5-boilerplate/dist/js/vendor/modernizr-2.8.3.min.js',

  '56f93dd15422646fdab9f88b1ce3977c.svg',
  '181fa2e1c310169f75151f7930013ed0.svg',
  '858a424ab82fbf8eac6221400fad1364.svg',

  'footer.html'

];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        console.log('Zawartosc urlsToCache'+urlsToCache);
        return cache.addAll(urlsToCache);
      }).catch(function(){
        console.log('Install listener error!');
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    ).catch(function (){

      console.log("Fetch listener error");
    })
  );
});