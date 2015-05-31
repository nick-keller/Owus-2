(function(){
    'use strict';

    angular.module('app')
        .controller('DebtsAddController', DebtsAddController);

    function DebtsAddController() {
        var vm = this;

        vm.action = 'Ajouter';
        vm.expense = {
            payer: null,
            recipients: []
        };
    }
})();