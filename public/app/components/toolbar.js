(function() {
    'use strict';

    angular.module('app')
        .controller('ToolbarController', ['$rootScope', '$state', ToolbarController])
        .directive('toolbar', function() {
            return {
                templateUrl: 'components/toolbar.html',
                restrict: 'E',
                scope: {},
                controller: 'ToolbarController',
                controllerAs: 'ctrl'
            };
        });

    function ToolbarController($rootScope, $state) {
        var vm = this;

        vm.sidebarHidden = true;
        vm.addBtnHidden = true;
        vm.toolbarHidden = false;
        vm.backHidden = true;
        vm.validHidden = true;
        vm.addState = null;
        vm.title = '';
        vm.fromState = null;

        vm.add = add;
        vm.back = back;
        vm.valid = valid;

        $rootScope.$on('$stateChangeSuccess', function(e, toState, toParams, fromState, fromParams) {
            vm.title = toState.data.title;
            vm.addBtnHidden = !toState.data.add;
            vm.addState =  toState.data.add;
            vm.toolbarHidden =  toState.data.toolbar === false;
            vm.backHidden = !toState.data.back;
            vm.fromState = fromState.name ? fromState.name : toState.data.back;
            vm.validHidden = !toState.data.valid;
        });

        function add() {
            $state.go(vm.addState);
        }

        function back() {
            $state.go(vm.fromState);
        }

        function valid() {
            $rootScope.$emit('validateDialog');
        }
    }
})();