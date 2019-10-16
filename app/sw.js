var CACHE_NAME = 'hw-project-cache';
var urlsToCache = [

  // // 'index.html',
  // 'view1/view1.html',
  // // 'view1/view1.js',
  // // './app/view1/view1.css',
  // // 'view2/view2.html',
  // // './players/players.html',
  // // './players/players.js',
  // // 'players/players.css',
  // 'list/list.html',
  // // 'list/list.js',
  // // 'list/list.css',

  '/',

  'dist/bundle.js',
  'index.html',

  // 'lib/html5-boilerplate/dist/css/normalize.css',
  // 'lib/html5-boilerplate/dist/css/main.css',
  // 'app.css',
  // 'lib/angular-material/angular-material.css',
  'lib/html5-boilerplate/dist/js/vendor/modernizr-2.8.3.min.js',

  // 'lib/angular/angular.js',
  // 'lib/angular-route/angular-route.js',
  // 'app.js',
  // 'view1/view1.js',
  // 'view2/view2.js',
  // 'players/players.js',
  // 'list/list.js',
  // 'lib/angular-local-storage/dist/angular-local-storage.js',
  // 'lib/angular-animate/angular-animate.min.js',
  // 'lib/angular-aria/angular-aria.min.js',
  // 'lib/angular-material/angular-material.min.js',
  // 'lib/angular-messages/angular-messages.min.js',

  // 'view1/view1.html',
  // 'view1/view1.css',
  // 'view1/view1.spec.js',
  'view1/account.svg',
  // 'view1/angular-material.css',
  // 'view1/bottom.html',
  'view1/share.svg',

  'view2/view2.html',
  // 'view2/view2.css',
  // 'view2/view2.spec.js',
  'view2/info.svg',
  'view2/menu.svg',

  'players/players.html',
  // 'players/players.css',
 
  'list/list.html',
  // 'list/list.css',

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