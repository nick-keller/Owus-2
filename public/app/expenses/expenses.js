(function(){
    'use strict';

    angular.module('app')
        .controller('ExpensesController', ['Expense', '_', 'snackbar', ExpensesController])
        .filter('expensesFilter', ['user', expensesFilter]);

    function ExpensesController(Expense, _, snackbar) {
        var vm = this;

        vm.expenses = Expense.mine();

        vm.delete = deleteExpense;

        function deleteExpense(e) {
            var expense = new Expense(e);
            expense.$delete();
            _.pull(vm.expenses, e);
            snackbar.add('Dépense supprimée');
        }
    }

    function expensesFilter(user) {
        return function(input, filter) {
            if(filter === 'all') {
                return input;
            }

            return input.filter(function(expense) {
                return (filter === 'debts') !== user.eq(expense.payer, user.current);
            });
        };
    }
})();
