(function(){
    'use strict';

    angular.module('app')
        .controller('ExpensesAddController', ['$rootScope', '$scope', 'Expense', '$state', ExpensesAddController]);

    function ExpensesAddController($rootScope, $scope, Expense, $state) {
        var vm = this;

        vm.action = 'Ajouter';
        vm.expense = new Expense({
            payer: null,
            recipients: [],
            amount: null,
            title: null
        });
        vm.errors = {};

        var submitListener = $rootScope.$on('validateDialog', function() {
            vm.expense.$save(function success() {
                $state.go('debts');
            }, function error(data) {
                vm.errors = data.data.errors;
            });
        });

        $scope.$on('$destroy', submitListener);
    }
})();