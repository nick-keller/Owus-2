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
                        controllerAs: 'ctrl',
                        data: {
                            toolbar: false
                        }
                    })
                    .state('debts', {
                        url: '/',
                        templateUrl: 'debts/debts.html',
                        controller: 'DebtsController',
                        controllerAs: 'ctrl',
                        data: {
                            title: 'Owus',
                            add: 'debts_add'
                        }
                    })
                    .state('debts_add', {
                        url: '/debts/add',
                        templateUrl: 'debts/form.html',
                        controller: 'DebtsAddController',
                        controllerAs: 'ctrl',
                        data: {
                            title: 'Ajouter'
                        }
                    });
            }
        ])
        .run(['$rootScope', '$state', 'user', function($rootScope, $state, user) {
            $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
                user.checkStatus();

                if(!user.isLoggedIn() && toState.name !== 'auth') {
                    // User wants to go on a page but is not logged in

                    e.preventDefault();
                    $state.go('auth');
                }

                if(user.isLoggedIn() && toState.name === 'auth') {
                    // User wants to go on auth page but is already logged in

                    e.preventDefault();

                    if(fromState.name === '') {
                        $state.go('debts');
                    }
                }
            });
        }]);
})();