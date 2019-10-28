'use strict';
import wizard1 from './wizard1.html'

angular.module('homeworkProject.wizard1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/wizard1', {
            // templateUrl: 'wizard1/wizard1.html',
            template: wizard1,
            controller: 'wizardsController'
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

    .controller('wizardsController', ['$scope', '$http', '$location', 'localStorageService', function ($scope, $http, $location, localStorageService) {

        console.log("Hello world!");

        $scope.storedData = {};

        let key = "user";

        $scope.next = function () {

            console.log($location.path()); //pokazuje aktualna lokalizacje - typem jest string

            ///Pobieranie zrealizowane juz w funkcji reload/////
            // if (localStorageService.get(key) != null) $scope.storedData = localStorageService.get(key); //zawsze pobieraj?      

            let nextIndex = parseInt($location.path().charAt($location.path().length - 1)) + 1; //inkrementacja indeksu

            if (nextIndex == 4) {

                //gdy checkboksy niekliknięte ustawiam na false zamiast undefined
                if ($scope.storedData.option1 == undefined) $scope.storedData.option1 = false;
                if ($scope.storedData.option2 == undefined) $scope.storedData.option2 = false;
                if ($scope.storedData.option3 == undefined) $scope.storedData.option3 = false;

            }

            //kazdy krok uaktualnia storedData o dane wprowadzone w inputach i checkboksach - zapisuje tak zmieniony obiekt w local storage

            localStorageService.set(key, $scope.storedData);

            $location.path("/wizard" + nextIndex); //przejscie do kolejnego okna wizarda 
        }

        $scope.prev = function () {

            let nextIndex = parseInt($location.path().charAt($location.path().length - 1)) - 1;

            $location.path("/wizard" + nextIndex);
        }

        $scope.abort = function () {

            $location.path("/view1");

            localStorageService.remove(key);
        }       

        $scope.summarise = function () {

            console.log("Podsumowanie!");

            $scope.finalSettings = localStorageService.get(key);
            // console.log($scope.finalSettings);
        }

        $scope.confirm = function () {

            alert("Dane zatwierdzone!");

            // $scope.abort();
        }

        $scope.reload = function () {

            //przy kazdym zaladowaniu widoku - nieistotne czy spowodowalo je klikniecie prev czy next - pobranie obiektu z local storage

            //dzieki temu przy cofaniu pola beda wypelnione wartosciami podanymi wczesniej przez uzytkownika

            if (localStorageService.get(key) != null) {

                $scope.storedData = localStorageService.get(key); //pobranie akutalnej zawartosci danych z local storage i przypisanie do obiektu, na ktorego polach operuja inputy
                console.log("Pobrane stored data");
                console.log($scope.storedData);

            }

            if ($location.path() == "/wizard4") {

                $scope.summarise();
            }
        }

        $scope.reload(); //przy kazdym przeladowaniu

    }])