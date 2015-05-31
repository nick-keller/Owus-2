(function() {
    'use strict';

    angular.module('app')
        .controller('UserPickerController', ['user', '$scope', UserPickerController])
        .directive('userPicker', function() {
            return {
                templateUrl: 'components/userPicker.html',
                restrict: 'A',
                scope: {
                    model: '=ngModel',
                    userPicker: '=userPicker'
                },
                controller: 'UserPickerController',
                controllerAs: 'ctrl',
                bindToController: true,
                link: function(scope, element, attr) {
                    element.on('click', function() {
                        scope.$apply(function() {
                            scope.ctrl.dialogHidden = false;
                        });
                    });

                    scope.$watchCollection(function(){return scope.ctrl.selected}, function(value) {
                        element[value.length ? 'removeClass' : 'addClass']('empty');
                    });
                }
            };
        });

    function UserPickerController(user, $scope) {
        var vm = this;

        vm.dialogHidden = true;
        vm.users = vm.userPicker ? vm.userPicker : user.current.friends;
        vm.multiple = Array.isArray(vm.model);
        vm.selected = [];

        vm.isSelected = isSelected;
        vm.select = select;

        // Bind model to view
        if(vm.multiple) {
            $scope.$watchCollection(function(){return vm.model}, function(value) {
                vm.selected = vm.model.map(function(id) {
                    return user.getFromId(id, vm.users);
                });
            });
        } else {
            $scope.$watch(function(){return vm.model}, function(value) {
                if(!value) {
                    vm.selected = [];
                    return;
                }

                vm.selected = [user.getFromId(value, vm.users)];
            });
        }

        // Bind view to model
        $scope.$watchCollection(function(){return vm.selected}, function(value) {

            if(vm.multiple) {
                vm.model = vm.selected.map(function(u) {
                    return u._id;
                });
            } else {
                vm.model = vm.selected.length ? vm.selected[0]._id : null;
            }
        });

        function isSelected(u) {
            return !!~vm.selected.indexOf(u);
        }

        function select(u) {
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
    }
})();