(function(){
    'use strict';

    angular.module('app')
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
            function($stateProvider, $urlRouterProvider, $locationProvider) {

                $urlRouterProvider.otherwise('/');
                $urlRouterProvider.when('', '/');

                $stateProvider
                    .state('auth', {
                        url: '/auth',
                        templateUrl: 'auth/auth.html',
                        controller: 'AuthController',
                        controllerAs: 'ctrl'
                    })
                    .state('debts', {
                        url: '/',
                        templateUrl: 'debts/debts.html',
                        controller: 'DebtsController',
                        controllerAs: 'ctrl'
                    });
            }
        ])
        .run(['$rootScope', '$state', function($rootScope, $state) {
            $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {

            });
        }]);
})();