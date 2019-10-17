import list from './list.html'

angular.module('homeworkProject.list', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider.
            when('/list', {
                template: list,
                controller: 'playersController'
            });
    }])

    


