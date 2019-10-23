'use strict';
import view1 from './view1.html'
import bottom from './bottom.html'

angular.module('homeworkProject.view1', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view1', {
      // templateUrl: 'view1/view1.html',
      template: view1,
      controller: 'View1Ctrl',
      // reloadOnSearch: false
    });
  }])

  .controller('View1Ctrl', ['$scope', '$mdBottomSheet', '$mdMenu', '$mdPanel', function ($scope, $mdBottomSheet, $mdMenu, $mdPanel) {

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

      let countingTime = new Date().getTime() + 10000; //10 s
      let now = new Date().getTime();

      // console.log(now);

      while (now < countingTime) {

        now = new Date().getTime();
      }

      console.log(now);


    }

    $scope.calcInWebWorker = function () {

      const myWorker = new Worker('worker.js');

      myWorker.postMessage("run");

      myWorker.addEventListener('message', function (e) {

        console.log(e.data);

      });
    }

    $scope.urlOfTemplate = "tekst template";

    ///////////////////

    $scope.showPanel = function ($event) {

      ///zabezpieczenie przed wyjsciem poza zakres kolejnych podstron wizarda

      // if ($scope.currentDialogPage < 1) {

      //   $scope.currentDialogPage = 1;
      // }

      // if ($scope.currentDialogPage > 3) {

      //   $scope.currentDialogPage = 3;
      // }

      $scope.urlOfTemplate = "view1/dialog-template-1.html";
      
      // console.log(urlOfTemplate);

      //

      var panelPosition = $mdPanel.newPanelPosition()
        .absolute()
        .center();

      // var panelAnimation = $mdPanel.newPanelAnimation()
      //   .openFrom($event)
      //   .duration(200)
      //   .closeTo('.md-display-3');
      //   .withAnimation($mdPanel.animation.SCALE);

      var config = {
        attachTo: angular.element(document.body),
        controller: 'View1Ctrl',
        position: panelPosition,
        // animation: panelAnimation,
        targetEvent: $event,
        templateUrl: $scope.urlOfTemplate,
        clickOutsideToClose: true,
        escapeToClose: true,
        focusOnOpen: true
      };

      $mdPanel.open(config).then(function (ref) {

        console.log(ref);
      });
    }



    $scope.nextPanel = function ($event) {

      //scope jest globalny
      console.log($scope.urlOfTemplate);
      $scope.closePanel();
      // $scope.currentDialogPage++;

      $scope.showPanel($event);
    }

    $scope.prevPanel = function ($event) {

      console.log("Prev panel");
      $scope.closePanel();
      // $scope.currentDialogPage--;
      $scope.showPanel($event);
    }

    //nieudane zamykanie

    $scope.closePanel = function () {

      console.log("Zamykam!");
      let el = document.querySelector('.dialogContainer');
      el.remove();
    }

  }]);