'use strict';
import wizard1 from './wizard1.html'
import { parse } from 'path';

angular.module('homeworkProject.wizard1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/wizard1', {
            // templateUrl: 'wizard1/wizard1.html',
            template: wizard1,
            controller: 'wizardsController'
        });
    }])

    .controller('wizardsController', ['$scope', '$http', '$location', function ($scope, $http, $location) {

        console.log("Hello world!");     

        $scope.next = function () {

            // console.log($location.path()); //pokazuje aktualna lokalizacje
            // console.log(typeof ($location.path())); //string

            // console.log($location.path().charAt($location.path().length-1)); //ostatni znak

            let nextIndex = parseInt($location.path().charAt($location.path().length-1))+1; //inkrementacja indeksu

            $location.path("/wizard"+nextIndex); //przejscie do kolejnego okna wizarda
        }

        $scope.prev = function (){

            let nextIndex = parseInt($location.path().charAt($location.path().length-1))-1;

            $location.path("/wizard"+nextIndex);            
        }

        $scope.abort = function (){

            $location.path("/view1");
        }



    }])