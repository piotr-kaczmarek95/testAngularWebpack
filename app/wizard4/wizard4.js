'use strict';
import wizard4 from './wizard4.html'

angular.module('homeworkProject.wizard4', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/wizard4', {
            // templateUrl: 'wizard1/wizard1.html',
            template: wizard4,
            controller: 'wizardsController'
        });
    }]);