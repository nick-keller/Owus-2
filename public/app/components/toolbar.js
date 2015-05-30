(function() {
    'use strict';

    angular.module('app')
        .controller('ToolbarController', [ToolbarController])
        .directive('toolbar', function() {
            return {
                templateUrl: 'components/toolbar.html',
                restrict: 'E',
                scope: {},
                controller: 'ToolbarController',
                controllerAs: 'ctrl'
            };
        });

    function ToolbarController() {
        var vm = this;

        vm.sidebarHidden = true;
    }
})();