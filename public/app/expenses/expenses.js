(function(){
    'use strict';

    angular.module('app')
        .controller('ExpensesController', ['Expense', ExpensesController])
        .filter('expensesFilter', ['user', expensesFilter]);

    function ExpensesController(Expense) {
        var vm = this;

        vm.expenses = Expense.mine();
    }

    function expensesFilter(user) {
        return function(input, filter) {
            if(filter === 'all') {
                return input;
            }

            return input.filter(function(expense) {
                return (filter === 'debts') !== user.eq(expense.payer, user.current);
            })
        }
    }
})();