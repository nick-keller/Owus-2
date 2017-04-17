(function(){
    'use strict';

    angular.module('app')
        .controller('DebtsController', ['Debt', 'user', '$scope', DebtsController]);

    function DebtsController(Debt, user, $scope) {
        var vm = this;

        vm.loading = true;
        vm.debts = [];
        Debt.query().$promise.then(function(debts) {
          vm.debts = debts;
          vm.loading = false;

        });
        vm.currentUser = user.current;

        $scope.$watchCollection(function(){return vm.debts;}, function() {
            vm.debtsPos = filterDebts(1);
            vm.debtsNeg = filterDebts(-1);
        });

        function filterDebts(filter) {
            return vm.debts.filter(function(debt) {
                return filter > 0 === debt.amount > 0 && debt.amount && Math.abs(debt.amount) >= 0.01;
            });
        }
    }
})();
