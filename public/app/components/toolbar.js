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
        vm.addState = null;
        vm.title = '';

        vm.add = add;

        $rootScope.$on('$stateChangeSuccess', function(e, toState, toParams, fromState, fromParams) {
            vm.title = toState.data.title;
            vm.addBtnHidden = !toState.data.add;
            vm.addState =  toState.data.add;
            vm.toolbarHidden =  toState.data.toolbar === false;
        });

        function add() {
            $state.go(vm.addState);
        }
    }
})();