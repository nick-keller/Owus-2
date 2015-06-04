(function(){
    'use strict';

    angular.module('app')
        .controller('ExpensesEditController', ['$rootScope', '$scope', 'Expense', '$state', 'snackbar', 'user', ExpensesEditController]);

    function ExpensesEditController($rootScope, $scope, Expense, $state, snackbar, user) {
        var vm = this;

        vm.expense = Expense.get({id:$state.params.id});
        vm.errors = {};

        var submitListener = $rootScope.$on('validateDialog', function() {
            vm.expense.$edit(function success() {
                snackbar.add("C'est noté !");
                $state.go('expenses');
            }, function error(data) {
                vm.errors = data.data.errors;
            });
        });

        $scope.$on('$destroy', submitListener);
    }
})();