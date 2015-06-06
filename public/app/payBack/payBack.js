(function(){
    'use strict';

    angular.module('app')
        .controller('PayBackController', ['Expense', 'snackbar', PayBackController]);

    function PayBackController(Expense, snackbar) {
        var vm = this;
    }
})();