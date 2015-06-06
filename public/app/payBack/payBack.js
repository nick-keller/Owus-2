(function(){
    'use strict';

    angular.module('app')
        .controller('PayBackController', ['Expense', 'snackbar', 'Debt', '$scope', '$timeout', 'user', '$rootScope', '$state', PayBackController]);

    function PayBackController(Expense, snackbar, Debt, $scope, $timeout, user, $rootScope, $state) {
        var vm = this;

        vm.give = {
            user: null,
            amount: null
        };
        vm.get = {
            user: null,
            amount: null
        };
        vm.usersToGive = [];
        vm.usersToGet = [];
        vm.currentUser = user.current;
        vm.action = 'give';

        vm.username = username;
        vm.gender = gender;

        vm.debts = Debt.query(function() {
            vm.usersToGive = filterUsers(1);
            vm.usersToGet = filterUsers(-1);

            if($state.params.user) {
                vm.debts.forEach(function(debt) {
                    if(debt.user._id === $state.params.user) {
                        if(debt.amount > 0) {
                            vm.give.user = debt.user._id;
                            vm.give.amount = debt.amount;
                            vm.give.target = debt.amount;
                            vm.action = 'give';
                        } else {
                            vm.get.user = debt.user._id;
                            vm.get.amount = -debt.amount;
                            vm.get.target = -debt.amount;
                            vm.action = 'get';
                        }
                    }
                });
            } else {
                if(vm.usersToGive.length === 1) {
                    vm.give.user = vm.usersToGive[0]._id;
                }
                if(vm.usersToGet.length === 1) {
                    vm.get.user = vm.usersToGet[0]._id;
                }

                if(!vm.usersToGive.length && vm.usersToGet.length) {
                    vm.action = 'get';
                }
            }
        });

        $scope.$watch(function(){return vm.give.user;}, function(value) {
            vm.debts.forEach(function(debt) {
                if(debt.user._id === value) {
                    vm.give.amount = debt.amount;
                    vm.give.target = debt.amount;
                }
            });
        });

        $scope.$watch(function(){return vm.get.user;}, function(value) {
            vm.debts.forEach(function(debt) {
                if(debt.user._id === value) {
                    vm.get.amount = -debt.amount;
                    vm.get.target = -debt.amount;
                }
            });
        });

        var submitListener = $rootScope.$on('validateDialog', save);

        $scope.$on('$destroy', submitListener);

        function filterUsers(filter) {
            var result = [];

            vm.debts.forEach(function(debt) {
                if(filter > 0 === debt.amount > 0 && debt.amount) {
                    result.push(debt.user);
                }
            });

            return result;
        }

        function save() {
            var expense = new Expense({
                payer: user.current._id,
                title: 'Remboursement',
                recipients: [user.current._id]
            });

            if(vm.action === 'give') {
                expense.amount = vm.give.amount;
                expense.recipients = [vm.give.user];
            } else {
                expense.amount = vm.get.amount;
                expense.payer = vm.get.user;
            }

            expense.$save(function success() {
                snackbar.add("C'est fait !");
                $state.go('debts');
            }, function error(data) {
                vm.errors = data.data.errors;
            });
        }

        function username(id) {
            if(id) {
                return user.getFromId(id).first_name;
            }
        }

        function gender(id, male, female) {
            if(id) {
                return user.getFromId(id).gender === 'male' ? male : female;
            }
        }
    }
})();