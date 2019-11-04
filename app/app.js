'use strict';

import angular from 'angular'
import localforage from 'localforage'

// console.log(navigator);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js').then(function (registration) {
      // Registration was successful
      console.log(registration);
      console.log('ServiceWorker registration successful with scope: ', registration
        .scope);
    }, function (err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

//dopisanie LocalStorageModule - konieczne by działał angular-local-storage

// Declare app level module which depends on views, and core components
angular.module('homeworkProject', [
    'ngRoute',
    'homeworkProject.view1',
    'homeworkProject.view2',
    'homeworkProject.players',
    'homeworkProject.list',
    'homeworkProject.wizard1',
    'homeworkProject.wizard2',
    'homeworkProject.wizard3',
    'homeworkProject.wizard4',
    'LocalStorageModule',
    'ngMaterial',
    'ngMessages',
    'LocalForageModule'

  ])
  .config(['$locationProvider', '$routeProvider', '$mdThemingProvider', function ($locationProvider, $routeProvider, $mdThemingProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({
      redirectTo: '/players'
    });

    $mdThemingProvider.theme('default').primaryPalette('grey').accentPalette('pink');



  }])

  // jeśli url nie jest view1, view2 albo template to przekieruj do view 1

  //trzeba dopisać konfigurację by działał angular-local-storage
  .config(['localStorageServiceProvider', function (localStorageServiceProvider) {

    localStorageServiceProvider.setPrefix('homework');

  }])

  .config(['$localForageProvider', function ($localForageProvider) {

    $localForageProvider.config({

      driver: localforage.INDEXEDDB, // if you want to force a driver
      name: 'lf', // name of the database and prefix for your data, it is "lf" by default
      version: 1.0, // version of the database, you shouldn't have to use this
      storeName: 'players', // name of the table
      description: 'players database'
    });

  }])