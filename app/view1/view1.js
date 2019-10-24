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

    //24.10

    $scope.showWizard = function () {

      document.querySelector("#panel-1").style.display = "block";
    }

    $scope.abort = function ($event) {

      console.log("Kliknales anuluj!");
      // console.log($event.target.id);

      //wylaczam kazdy panel 

      document.querySelector("#panel-1").style.display = "none";
      document.querySelector("#panel-2").style.display = "none";
      document.querySelector("#panel-3").style.display = "none";
      document.querySelector("#panel-4").style.display = "none";

      //resetowanie wprowadzonych danych do wartości początkowej
      $scope.userName = "";
      $scope.userAge = "";

      $scope.tooYoung = true;
      $scope.disableProgress = true;

      $scope.option1 = false;
      $scope.option2 = false;
      $scope.option3 = false;  

    }

    $scope.tooYoung = false;

    $scope.next = function ($event) {

      console.log("Kliknales next!");
      // console.log($event.target.id);

      if ($scope.disableProgress) return; //zabezpieczenie na wypadek zbyt krotkiej nazwy uzytkownika

      // przycisk zawiera w id numer okna, w ktorym byl wyswietlony

      console.log($event.target.id.charAt($event.target.id.length - 1));

      if (($event.target.id.charAt($event.target.id.length - 1) == 2) && $scope.tooYoung) return; //zabezpieczenie na wypadek zbyt niskiego wieku podawanego w slajdzie drugim

      //urkywam dotychczas widoczne okno - sklejam jego id

      let currentVisibleId = "panel-" + ($event.target.id.charAt($event.target.id.length - 1));
      console.log("Wylaczam widocznosc " + currentVisibleId);

      // console.log(document.querySelector("#"+currentVisibleId));

      document.querySelector("#" + currentVisibleId).style.display = "none";

      //zmieniam indeks, by wskazywal na kolejne okno

      let nextVisibleIndex = parseInt($event.target.id.charAt($event.target.id.length - 1)) + 1;
      console.log(nextVisibleIndex);

      //sklejam id kolejnego panelu

      let nextVisible = "#panel-" + (nextVisibleIndex);
      console.log(nextVisible);

      console.log(document.querySelector(nextVisible));

      //i ustawiam widocznosc

      document.querySelector(nextVisible).style.display = "block";

    }

    $scope.prev = function ($event) {

      console.log("Kliknales prev!");
      console.log($event.target.id);

      console.log("Kliknales next!");

      // teraz widze to okno

      console.log($event.target.id.charAt($event.target.id.length - 1));

      //urkywam

      let currentVisibleId = "panel-" + ($event.target.id.charAt($event.target.id.length - 1));
      console.log("Wylaczam widocznosc " + currentVisibleId);

      // console.log(document.querySelector("#"+currentVisibleId));

      document.querySelector("#" + currentVisibleId).style.display = "none";

      //a musze zobaczyc poprzednie - zmniejszam indeks o jeden

      let nextVisibleIndex = parseInt($event.target.id.charAt($event.target.id.length - 1)) - 1;
      console.log(nextVisibleIndex);

      let nextVisible = "#panel-" + (nextVisibleIndex);
      console.log(nextVisible);

      //i ustawiam widocznosc

      console.log(document.querySelector(nextVisible));

      document.querySelector(nextVisible).style.display = "block";

    }

    $scope.confirm = function ($event){

      alert("Dane zatwierdzone!");
      $scope.abort($event);
    }

    $scope.disableProgress = true;

    $scope.checkLength = function ($event) {

      //imie minimum dwuliterowe

      console.log("Zmiana!");
      console.log($scope.userName);

      if ($scope.userName != undefined) console.log($scope.userName.length);

      if ($scope.userName != undefined && $scope.userName.length > 1) {

        $scope.disableProgress = false;
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