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
        // $scope.option1 = false;
        // $scope.option2 = false;
        // $scope.option3 = false;

        $scope.storedData = {};

        let key = "user";

        $scope.next = function () {

            console.log($location.path()); //pokazuje aktualna lokalizacje
            // console.log(typeof ($location.path())); //string

            ///Pobieranie zrealizowane juz w funkcji reload/////
            // if (localStorageService.get(key) != null) $scope.storedData = localStorageService.get(key); //zawsze pobieraj?      

            let nextIndex = parseInt($location.path().charAt($location.path().length - 1)) + 1; //inkrementacja indeksu

            $location.path("/wizard" + nextIndex); //przejscie do kolejnego okna wizarda

            // if (nextIndex == 2) {

            //     // console.log($scope.name, $scope.surname);

            //     // localStorageService.set("userName", $scope.name);
            //     // localStorageService.set("userSurname", $scope.surname);

            //     //pobranie ze storage obiektu z obecnie wpisanymi danymi
            //     // if ($scope.storedData) {
            //     //     $scope.storedData = localStorageService.get(key);
            //     // }
            //     // dopisanie własności

            //     //niepotrzebnie, bo już tak nazywam?

            //     // $scope.storedData.userName = $scope.name;
            //     // $scope.storedData.userSurname = $scope.surname;

            //     //zapisanie do storage
            //     localStorageService.set(key, $scope.storedData);
            // }

            // if (nextIndex == 3) {

            //     // localStorageService.set("userAge", $scope.age);


            //     //pobranie ze storage obiektu z obecnie wpisanymi danymi
            //     // if ($scope.storedData) {
            //     //     $scope.storedData = localStorageService.get(key);
            //     // }
            //     // dopisanie własności
            //     // $scope.storedData.userAge = $scope.age;
            //     //zapisanie do storage              

            //     localStorageService.set(key, $scope.storedData);

            // }

            if (nextIndex == 4) {
           
                //gdy niekliknięte ustawiam na false zamiast undefined
                if ($scope.storedData.option1 == undefined) $scope.storedData.option1 = false;
                if ($scope.storedData.option2 == undefined) $scope.storedData.option2 = false;
                if ($scope.storedData.option3 == undefined) $scope.storedData.option3 = false;
                // localStorageService.set(key, $scope.storedData);

            }

            localStorageService.set(key, $scope.storedData);
        }

        $scope.prev = function () {

            let nextIndex = parseInt($location.path().charAt($location.path().length - 1)) - 1;

            $location.path("/wizard" + nextIndex);
        }

        $scope.abort = function () {

            $location.path("/view1");

            localStorageService.remove(key);
        }

        $scope.tooYoung = function () {

            if ($scope.storedData.userAge != undefined) {

                if ($scope.storedData.userAge < 15) {
                    $scope.lockSecondWindow = true;
                } else {
                    $scope.lockSecondWindow = false;
                }

            }
        }

        $scope.tooShort = function () {

            console.log("Zmiana wykryta!");

            // zabezpieczenie minimalnej dlugosci imienia i nazwiska

            if ($scope.storedData.userName != undefined && $scope.storedData.userName.length > 1 && $scope.storedData.userSurname != undefined && $scope.storedData.userSurname.length > 1) {

                $scope.lockFirstWindow = false;
            } else {

                $scope.lockFirstWindow = true;
            }

            console.log($scope.lockFirstWindow);

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

        //przejcie do czwartego ekranu wizarda powoduje zebranie wprowadzonych danych do pojedynczego obiektu w local storage i wyswietlenie 

        //przeniesione do funkcji reload

        // if ($location.path() == "/wizard4") {

        //     $scope.summarise();
        // }

        $scope.reload = function () {

            //przy kazdym zaladowaniu widoku - nieistotne czy spowodowalo go klikniecie prev czy next - pobranie obiektu z local storage

            //dzieki temu przy cofaniu pola beda wypelnione wartosciami podanymi wczesniej przez uzytkownika

            if (localStorageService.get(key) != null){

                $scope.storedData = localStorageService.get(key); //pobranie akutalnej zawartosci danych z local storage i przypisanie do obiektu, na ktorym operuja inputy
                console.log("Pobrane stored data");
                console.log($scope.storedData);

            }        

            if ($location.path() == "/wizard1") {


                $scope.tooShort(); //gdy cofam sie ze slajdu 2 - automatyczne sprawdzenie (a nie przy zmianie tekstu w inpucie)

            }

            if ($location.path() == "/wizard2") {

                $scope.tooYoung();
            }

            if ($location.path() == "/wizard3") {

            
            }

            if ($location.path() == "/wizard4") {

                $scope.summarise();
            }
        }

        $scope.reload(); //przy kazdym przeladowaniu





    }])