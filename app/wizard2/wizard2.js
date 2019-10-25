'use strict';
import wizard2 from './wizard2.html'

angular.module('homeworkProject.wizard2', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/wizard2', {
            // templateUrl: 'wizard1/wizard1.html',
            template: wizard2,
            controller: 'wizardsController'
        });
    }]);