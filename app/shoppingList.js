/**
 * Created by rhartzell on 4/7/16.
 */

var app = angular.module("shoppingList", ['ngMaterial', 'ngMessages', 'ui.router']);

app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/signin');

    $stateProvider

        .state('signin', {
            url: '/signin',
            templateUrl: 'app/components/signin/signin.partial.html',
            controller: 'signinController'
        })

        .state('signup', {
            url: '/signup',
            templateUrl: 'app/components/signup/signup.partial.html',
            controller: 'signupController'
        })

        .state('main', {
            url: '/main',
            templateUrl: 'app/components/main/main.partial.html',
            controller: 'mainController'
        })
});

app.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('green')
        .accentPalette('orange');
});