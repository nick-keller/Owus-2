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
                            add: 'expenses_add'
                        }
                    })
                    .state('expenses', {
                        url: '/expenses',
                        templateUrl: 'expenses/expenses.html',
                        controller: 'ExpensesController',
                        controllerAs: 'ctrl',
                        data: {
                            title: 'Historique',
                            add: 'expenses_add'
                        }
                    })
                    .state('expenses_add', {
                        url: '/expenses/add',
                        templateUrl: 'expenses/form.html',
                        controller: 'ExpensesAddController',
                        controllerAs: 'ctrl',
                        data: {
                            title: 'Ajouter',
                            back: 'expenses',
                            valid: true
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