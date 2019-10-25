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

  .filter('translateValue', function () {
    return function (item) {

      if (item == true) {

        return "tak";
      } else {

        return "nie";
      }

    };
  })

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

    // const header = document.querySelector("h1");
    // console.log(header.innerText); //działa

    //domyslne ukrycie okien

    $scope.wizardWindowVisible = {

      w1: false,
      w2: false,
      w3: false,
      w4: false
    }


    //24.10

    $scope.showWizard = function () {

      // document.querySelector("#panel-1").style.display = "block";
      $scope.wizardWindowVisible.w1 = true;
    }

    $scope.abort = function ($event) {

      console.log("Kliknales anuluj!");

      //ukrycie aktualnie widocznego okna

      for (let property in $scope.wizardWindowVisible) {

        if ($scope.wizardWindowVisible[property] == true) {

          $scope.wizardWindowVisible[property] = false;
          break;
        }

      }

      //resetowanie wprowadzonych danych do wartości początkowej
      $scope.userName = "";
      $scope.userAge = "";

      $scope.tooYoung = true;
      $scope.disableProgress = true;

      $scope.option1 = false;
      $scope.option2 = false;
      $scope.option3 = false;

    }

    $scope.tooYoung = true;

    $scope.next = function ($event) {

      console.log("Kliknales next!");
      // console.log($event.target.id);

      if ($scope.disableProgress) return; //zabezpieczenie na wypadek zbyt krotkiej nazwy uzytkownika

      // przycisk zawiera w id numer okna, w ktorym byl wyswietlony

      console.log($event.target.id.charAt($event.target.id.length - 1));

      if (($event.target.id.charAt($event.target.id.length - 1) == 2) && $scope.tooYoung) return; //zabezpieczenie na wypadek zbyt niskiego wieku podawanego w slajdzie drugim

      let currentIndex = parseInt($event.target.id.charAt($event.target.id.length - 1)); //obecny slajd

      // console.log("$scope.wizardWindowVisible.w"+currentIndex);
      eval("$scope.wizardWindowVisible.w" + currentIndex + "=false");
      // console.log("$scope.wizardWindowVisible.w"+currentIndex+"=false");
      eval("$scope.wizardWindowVisible.w" + (currentIndex + 1) + "=true");
      // console.log("$scope.wizardWindowVisible.w"+(currentIndex+1)+"=true");

    }

    $scope.prev = function ($event) {

      console.log("Kliknales prev!");
      console.log($event.target.id);

      // teraz widze to okno

      console.log($event.target.id.charAt($event.target.id.length - 1));

      let currentIndex = parseInt($event.target.id.charAt($event.target.id.length - 1));

      // ukrycie obecnego okna 

      eval("$scope.wizardWindowVisible.w" + currentIndex + "=false");

      // pokazanie poprzedniego 

      eval("$scope.wizardWindowVisible.w" + (currentIndex - 1) + "=true");

    }

    $scope.confirm = function ($event) {

      alert("Dane zatwierdzone!");
      $scope.abort($event);
    }

    $scope.disableProgress = true;

    $scope.checkLength = function () {

      //imie minimum dwuliterowe

      console.log("Zmiana!");
      console.log($scope.userName);

      if ($scope.userName != undefined) console.log($scope.userName.length);

      if ($scope.userName != undefined && $scope.userName.length > 1) {

        $scope.disableProgress = false;
      } else {

        $scope.disableProgress = true;
      }

      console.log("Wartosc disable progress " + $scope.disableProgress);

    }

    $scope.checkAge = function () {

      if ($scope.userAge != undefined) {

        if ($scope.userAge < 15) {
          $scope.tooYoung = true;
        } else {
          $scope.tooYoung = false;
        }

        console.log("Too young " + $scope.tooYoung);
      }
    }

    ////default options set

    $scope.option1 = false;
    $scope.option2 = false;
    $scope.option3 = false;

  }]);