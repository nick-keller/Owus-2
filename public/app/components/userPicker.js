(function() {
    'use strict';

    angular.module('app')
        .controller('UserPickerController', ['user', UserPickerController])
        .directive('userPicker', function() {
            return {
                templateUrl: 'components/userPicker.html',
                restrict: 'A',
                scope: {},
                controller: 'UserPickerController',
                controllerAs: 'ctrl'
            };
        });

    function UserPickerController(user) {
        var vm = this;
    }
})();