(function() {
    'use strict';

    angular.module('app')
        .controller('UserPickerController', ['user', 'Expense', '$scope', '_', UserPickerController])
        .directive('userPicker', function() {
            return {
                templateUrl: 'components/userPicker.html',
                restrict: 'A',
                scope: {
                    model: '=ngModel',
                    userPicker: '=userPicker'
                },
                require: 'ngModel',
                controller: 'UserPickerController',
                controllerAs: 'ctrl',
                bindToController: true,
                link: function(scope, element, attr, ngModelController) {
                    element.on('click', function() {
                        scope.$apply(function() {
                            scope.ctrl.dialogHidden = false;
                        });
                    });

                    element.on('blur', function() {
                        scope.$apply(function() {
                            ngModelController.$setTouched();
                        });
                    });

                    scope.$watchCollection(function(){return scope.ctrl.selected}, function(value) {
                        element[value.length ? 'removeClass' : 'addClass']('empty');
                        if(attr.required) {
                            if(value.length > 0) {
                                ngModelController.$setValidity('empty', true);
                            } else {
                                ngModelController.$setValidity('empty', false);
                            }
                        }
                    });

                }
            };
        });

    function UserPickerController(user, Expense, $scope, _) {

        var vm = this;
        const max_suggestions = 5;

        vm.dialogHidden = true;
        vm.users = vm.userPicker ? vm.userPicker : getUserAndItsFriends();
        vm.selected = [];
        vm.isSelected = isSelected;
        vm.select = select;
        vm.user_suggestions = [];
        vm.suggestions_loading = false;

        if(!vm.userPicker) {
            var unwatchFriends = $scope.$watchCollection(function(){return user.current.friends;}, function(value) {
                vm.users = getUserAndItsFriends();
                if (!vm.suggestions_loading) {
                  getUserSuggestions();
                }
            });
        }

        $scope.$watchCollection(function(){return vm.userPicker;}, function(value) {
            if(value) {
                vm.users = value;

                if(unwatchFriends) {
                    unwatchFriends();
                }
            }
        });

        // Bind model to view
        $scope.$watchCollection(function(){return vm.model;}, function() {
            vm.multiple = Array.isArray(vm.model);

            if(vm.multiple) {
                vm.selected = vm.model.map(function(id) {
                    return user.getFromId(id, vm.users);
                });
            } else {
                if(!vm.model) {
                    vm.selected = [];
                } else {
                    vm.selected = [user.getFromId(vm.model, vm.users)];
                }
            }
        });

        // Bind view to model
        $scope.$watchCollection(function(){return vm.selected;}, function() {

            if(vm.multiple) {
                vm.model = vm.selected.map(function(u) {
                    return u._id;
                });
            } else {
                vm.model = vm.selected.length ? vm.selected[0]._id : null;
            }
        });

        $scope.mostRecent = function(friend) {
          if (user.eq(user.current, friend)) {
            return -1;
          }
          return friend.name;
        }

        function getUserSuggestions() {
          vm.suggestions_loading = true;
          if (vm.user_suggestions.length == 0) {
            Expense.mine().$promise.then(function(expenses) {
              _.forEachRight(expenses, function(expense) {
                vm.user_suggestions = _.unionBy(vm.user_suggestions, getOtherUsersFromExpense(expense), "_id");
                if (vm.user_suggestions.length > max_suggestions) {
                  vm.user_suggestions = vm.user_suggestions.slice(0,max_suggestions);
                  return false;
                }
              });
            });
          }
        }

        function getUserAndItsFriends() {
            return user.current.friends.concat(user.current);
        }

        function isSelected(u) {
            return !!~vm.selected.indexOf(u);
        }

        function select(u) {
            $scope.filter = '';
            if(vm.multiple) {
                var index = vm.selected.indexOf(u);
                if(~index) {
                    vm.selected.splice(index, 1);
                } else {
                    vm.selected.push(u);
                }
            } else {
                vm.dialogHidden = true;
                vm.selected = [u];
            }
        }

        /**
         * Returns all users concerned by the expense except current one
         */
        function getOtherUsersFromExpense(expense) {

          var exp_users_tmp = expense.recipients;
          var exp_users = [];

          if (!_.some(exp_users_tmp, expense.payer)) {
            exp_users_tmp.push(expense.payer);
          }

          _.remove(exp_users_tmp, function(u) {
            return (user.current._id === u._id);
          });

          _.each(exp_users_tmp, function(tmp_user) {
            exp_users.push(getFriendById(tmp_user._id));
          });

          return exp_users;
        }

        function getFriendById(uid) {
          var friend = vm.users.filter(function( obj ) {
            return (obj._id === uid);
          });

          return friend ? friend[0] : null;
        }

    }
})();
