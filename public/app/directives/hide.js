(function() {
    'use strict';

    angular.module('app')
        .directive('hide', function() {
            return {
                restrict: 'A',
                link: function(scope, element, attr) {
                    scope.$watch(attr.hide, function(value) {
                        element[value ? 'addClass' : 'removeClass']('hidden');
                    });
                }
            };
        });
})();