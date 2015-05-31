(function(){
    'use strict';

    angular.module('app')
        .controller('DebtsAddController', ['$rootScope', '$scope', 'Expense', '$state', DebtsAddController]);

    function DebtsAddController($rootScope, $scope, Expense, $state) {
        var vm = this;

        vm.action = 'Ajouter';
        vm.expense = new Expense({
            payer: null,
            recipients: [],
            amount: null,
            title: null
        });

        var submitListener = $rootScope.$on('validateDialog', function() {
            vm.expense.$save(function success() {
                $state.go('debts');
            }, function error() {
                console.log('error');
            });
        });

        $scope.$on('$destroy', submitListener);
    }
})();