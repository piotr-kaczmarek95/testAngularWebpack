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

    .controller('wizardsController', ['$scope', '$http', '$location', 'localStorageService', function ($scope, $http, $location, localStorageService) {

        console.log("Hello world!");

        $scope.lockFirstWindow = true;
        $scope.lockSecondWindow = true;
        $scope.option1 = false;
        $scope.option2 = false;
        $scope.option3 = false;
        let key = "userData";

        $scope.next = function () {

            console.log($location.path()); //pokazuje aktualna lokalizacje
            // console.log(typeof ($location.path())); //string

            // console.log($location.path().charAt($location.path().length-1)); //ostatni znak

            let nextIndex = parseInt($location.path().charAt($location.path().length - 1)) + 1; //inkrementacja indeksu

            $location.path("/wizard" + nextIndex); //przejscie do kolejnego okna wizarda

            if (nextIndex == 2){

                localStorageService.set("userName", $scope.name);
                localStorageService.set("userSurname", $scope.surname);
            }

            if (nextIndex == 3){

                localStorageService.set("userAge", $scope.age);
            }

            if (nextIndex == 4){

                localStorageService.set("option1", $scope.option1);
                localStorageService.set("option2", $scope.option2);
                localStorageService.set("option3", $scope.option3);   
                $scope.summarise();             
            }

            //wpis wartosci do localstorage            

            //gdy obiekt przechowujacy wpisane przez użytkownika dane istnieje już w local storage, to przepisz już zachowane pola

            // if (localStorageService.get(key) && (localStorageService.get(key).name != undefined)) {

            //     $scope.wizardData.name = localStorageService.get(key).name;
            // }

            // if (localStorageService.get(key) && (localStorageService.get(key).surname != undefined)) {

            //     $scope.wizardData.surname = localStorageService.get(key).surname;
            // }

            // if (localStorageService.get(key) && (localStorageService.get(key).age != undefined)) {

            //     $scope.wizardData.age = localStorageService.get(key).age;
            // }

            // let userValues = {

            //     name: $scope.wizardData.name,
            //     surname: $scope.wizardData.surname,
            //     age: $scope.wizardData.age,
            //     option1: $scope.wizardData.option1,
            //     option2: $scope.wizardData.option2,
            //     option3: $scope.wizardData.option3
            // }

            // console.log($scope.wizardData.option2);

            // //i uaktualnij

            // localStorageService.set(key, userValues);

        }

        $scope.prev = function () {

            let nextIndex = parseInt($location.path().charAt($location.path().length - 1)) - 1;

            $location.path("/wizard" + nextIndex); 
        }

        $scope.abort = function () {

            $location.path("/view1");
            localStorageService.remove("userName", "userSurname", "userAge", "option1", "option2", "option3");
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

        $scope.summarise = function(){

            console.log("Podsumowanie!");

            var keys =  localStorageService.keys();
            console.log(keys);

            $scope.finalSettings = {

                userName : localStorageService.get("userName"),
                userSurname : localStorageService.get("userSurname"),
                userAge : localStorageService.get("userAge"),
                option1 : localStorageService.get("option1"),
                option2 : localStorageService.get("option2"),
                option3 : localStorageService.get("option3")
            }

            localStorageService.remove("userName", "userSurname", "userAge", "option1", "option2", "option3");

            // console.log($scope.finalSettings);

            localStorageService.set("finalSettings", $scope.finalSettings);


        }





    }])