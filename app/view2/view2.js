'use strict';
import view2 from './view2.html'
import menu from '../svgs/menu.svg'
import info from '../svgs/info.svg'

angular.module('homeworkProject.view2', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view2', {
      // templateUrl: 'view2/view2.html',
      template: view2,
      controller: 'View2Ctrl'
    });
  }])

  .controller('View2Ctrl', ['$scope', '$http', '$localForage', function ($scope, $http, $localForage) {

    $scope.menu = menu;
    $scope.info = info;


    $scope.text = "Losowy fakt";

    const successCallback = function (response) {

      $scope.data = response.data;
      console.log(response.data);
    }

    const errorCallback = function () {

      console.log("Wystąpił błąd!");
    }

    $http({
      method: 'GET',
      url: 'http://numbersapi.com/random/trivia'
    }).then(successCallback, errorCallback); //nazwy funkcji - bez argumentow

    //do testowania elementu md-autocomplete

    // $scope.clubs = ['Wisla', 'Lech', 'Legia'];

    //tablica z pasującymi wpisami

    //text jest przezwiskiem kolejnego elementu tablicy, który jest sprawdzamy

    // $scope.matching = [];

    // $scope.showChosen = function () {

    //   $scope.matching = $scope.clubs.filter(function (clubName) {

    //     return clubName.toLowerCase().startsWith($scope.searchedClub.toLowerCase());

    //     //jesli prawda, to wrzucam do matching

    //   })

    //   console.log($scope.searchedClub);
    //   console.log($scope.matching);

    // }

    // function createFilterFor(query) {
    //   var lowercaseQuery = query.toLowerCase();

    //   return function filterFn(state) {
    //     return (state.value.indexOf(lowercaseQuery) === 0);
    //   };

    /*$scope.zmienna = "To jest zmienna";

    $scope.funkcja = function () {

      console.log($scope.myObj.myVar);
      // console.log("Zmiana");
    }

    $scope.dodaj = function () {

      localforage.setItem('key', $scope.zmienna);
      console.log("Dodane!");
    }

    $scope.pobierz = function () {

      //tu jest wymaganie rozwiazania obietnicy

      // $scope.zmiennaPobrana = localforage.getItem('key');
      // console.log($scope.zmiennaPobrana);

      localforage.getItem('key').then(function(val){

        $scope.zmiennaPobrana = val;
        console.log($scope.zmiennaPobrana);
        $scope.$digest();
      })

    }

    $scope.usun = function () {

      localforage.removeItem('key');
      console.log("Usuniete");
      $scope.zmiennaPobrana = "";
    }*/

  }])