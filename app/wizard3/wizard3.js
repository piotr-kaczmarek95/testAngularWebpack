'use strict';
import wizard3 from './wizard3.html'

angular.module('homeworkProject.wizard3', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/wizard3', {
            // templateUrl: 'wizard1/wizard1.html',
            template: wizard3,
            controller: 'wizardsController'
        });
    }]);