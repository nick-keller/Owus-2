(function(){
    'use strict';

    angular.module('app')
        .controller('DebtsController', ['Debt', 'user', '$scope', DebtsController]);

    function DebtsController(Debt, user, $scope) {
        var vm = this;

        vm.debts = Debt.query();
        vm.currentUser = user.current;

        $scope.$watchCollection(function(){return vm.debts;}, function() {
            vm.debtsPos = filterDebts(1);
            vm.debtsNeg = filterDebts(-1);
        });

        function filterDebts(filter) {
            return vm.debts.filter(function(debt) {
                return filter > 0 === debt.amount > 0;
            });
        }
    }
})();