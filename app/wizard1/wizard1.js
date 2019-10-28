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

        $scope.lockFirstWindow = true;
        $scope.lockSecondWindow = true;
        $scope.option1 = false;
        $scope.option2 = false;
        $scope.option3 = false;
        $scope.finalSettings = undefined;
        let key = "userData";

        $scope.next = function () {

            console.log($location.path()); //pokazuje aktualna lokalizacje
            // console.log(typeof ($location.path())); //string

            // console.log($location.path().charAt($location.path().length-1)); //ostatni znak

            let nextIndex = parseInt($location.path().charAt($location.path().length - 1)) + 1; //inkrementacja indeksu

            $location.path("/wizard" + nextIndex); //przejscie do kolejnego okna wizarda

            if (nextIndex == 2) {

                localStorageService.set("userName", $scope.name);
                localStorageService.set("userSurname", $scope.surname);
            }

            if (nextIndex == 3) {

                localStorageService.set("userAge", $scope.age);
            }

            if (nextIndex == 4) {

                localStorageService.set("option1", $scope.option1);
                localStorageService.set("option2", $scope.option2);
                localStorageService.set("option3", $scope.option3);
                // $scope.summarise();             
            }
        }

        $scope.prev = function () {

            let nextIndex = parseInt($location.path().charAt($location.path().length - 1)) - 1;

            $location.path("/wizard" + nextIndex);
        }

        $scope.abort = function () {

            $location.path("/view1");
            localStorageService.remove("userName", "userSurname", "userAge", "option1", "option2", "option3"); //usuniecie zmiennych tymczasowo przechowujacych wprowadzone dane
        }

        $scope.tooYoung = function () {

            if ($scope.age != undefined) {

                if ($scope.age < 15) {
                    $scope.lockSecondWindow = true;
                } else {
                    $scope.lockSecondWindow = false;
                }

            }
        }

        $scope.tooShort = function () {

            console.log("Zmiana wykryta!");

            // zabezpieczenie minimalnej dlugosci imienia i nazwiska

            if ($scope.name != undefined && $scope.name.length > 1 && $scope.surname != undefined && $scope.surname.length > 1) {

                $scope.lockFirstWindow = false;
            } else {

                $scope.lockFirstWindow = true;
            }

            console.log($scope.lockFirstWindow);

        }

        $scope.summarise = function () {

            console.log("Podsumowanie!");

            var keys = localStorageService.keys();
            console.log(keys);

            $scope.finalSettings = {

                userName: localStorageService.get("userName"),
                userSurname: localStorageService.get("userSurname"),
                userAge: localStorageService.get("userAge"),
                option1: localStorageService.get("option1"),
                option2: localStorageService.get("option2"),
                option3: localStorageService.get("option3")
            }

            // localStorageService.remove("userName", "userSurname", "userAge", "option1", "option2", "option3");

            // console.log($scope.finalSettings);

            localStorageService.set("finalSettings", $scope.finalSettings);
            console.log($scope.finalSettings);


        }

        $scope.confirm = function () {

            alert("Dane zatwierdzone!");

            $scope.abort();
        }

        //przejcie do czwartego ekranu wizarda powoduje zebranie wprowadzonych danych do pojedynczego obiektu w local storage i wyswietlenie 

        if ($location.path() == "/wizard4") {

            $scope.summarise();
        }

        $scope.reload = function () {

            if ($location.path() == "/wizard1") {

                //gdy sie cofam ze slajdu 2- wpisuje w inputy to, co juz wczesniej podal uzytkownik

                $scope.name = localStorageService.get("userName");
                $scope.surname = localStorageService.get("userSurname");
                $scope.tooShort(); //gdy cofam sie ze slajdu 2 - automatyczne sprawdzenie (a nie przy zmianie tekstu w inpucie)

            }

            if ($location.path() == "/wizard2") {

                $scope.age = localStorageService.get("userAge");
                $scope.tooYoung();
            }

            if ($location.path() == "/wizard3") {

                $scope.option1 = localStorageService.get("option1");
                $scope.option2 = localStorageService.get("option2");
                $scope.option3 = localStorageService.get("option3");
            }

            if ($location.path() == "/wizard4") {

                $scope.summarise();
            }
        }

        $scope.reload(); //przy kazdym przeladowaniu





    }])