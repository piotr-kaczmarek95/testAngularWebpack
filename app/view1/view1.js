'use strict';
import view1 from './view1.html'
import bottom from './bottom.html'

angular.module('homeworkProject.view1', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view1', {
      // templateUrl: 'view1/view1.html',
      template: view1,
      controller: 'View1Ctrl'
    });
  }])

  .controller('View1Ctrl', ['$scope', '$mdBottomSheet', '$mdMenu', function ($scope, $mdBottomSheet, $mdMenu) {

    $scope.showText = function () {

      console.log($scope.myDate);

      let todayDate = new Date();
      console.log(todayDate);


      let birthDate = $scope.myDate;

      let diff = todayDate.getTime() - birthDate.getTime();

      let diffYears = Math.floor((diff / (365 * 1000 * 3600 * 24)));


      console.log(diffYears);
    }

    $scope.showListBottomSheet = function () {
      $scope.alert = '';
      $mdBottomSheet.show({
        // templateUrl: 'view1/bottom.html',
        template: bottom,
        controller: 'View1Ctrl'
      })
    }

    $scope.openMenu = function (menu) {

      menu.open();

    }

    $scope.calcInMainThread = function () {

      // console.log("Obliczenia w wątku głównym");
      // for (let i=100000; i>0; i--){

      //   console.log("Odliczam! "+ i);

      // }

      let countingTime = new Date().getTime()+10000; //10 s
      let now = new Date().getTime();

      // console.log(now);

      while (now < countingTime){

        now = new Date().getTime();    
      }

      console.log(now);


    }

    $scope.calcInWebWorker = function () {

      const myWorker = new Worker('worker.js');

      myWorker.postMessage("run");

      myWorker.addEventListener('message', function(e){

         console.log(e.data);

      });

    }

  }]);