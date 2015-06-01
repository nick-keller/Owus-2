(function(){
    'use strict';

    angular.module('app')
        .controller('ExpensesController', ['Expense', ExpensesController]);

    function ExpensesController(Expense) {
        var vm = this;

        vm.expenses = Expense.mine();
    }
})();