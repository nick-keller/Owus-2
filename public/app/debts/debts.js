(function(){
    'use strict';

    angular.module('app')
        .controller('DebtsController', ['Debt', DebtsController]);

    function DebtsController(Debt) {
        var vm = this;

        vm.debts = Debt.query();
    }
})();