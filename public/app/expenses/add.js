(function(){
    'use strict';

    angular.module('app')
        .controller('ExpensesAddController', ['$rootScope', '$scope', 'Expense', '$state', 'snackbar', 'user', ExpensesAddController]);

    function ExpensesAddController($rootScope, $scope, Expense, $state, snackbar, user) {
        var vm = this;

        vm.expense = new Expense({
            payer: user.current._id,
            recipients: [],
            amount: null,
            title: null
        });
        vm.errors = {};

        var submitListener = $rootScope.$on('validateDialog', function() {
            vm.expense.$save(function success() {
                snackbar.add("C'est noté !");
                $state.go('debts');
            }, function error(data) {
                vm.errors = data.data.errors;
            });
        });

        $scope.$on('$destroy', submitListener);
    }
})();