(function() {
    'use strict';

    angular.module('app')
        .directive('active', function() {
            return {
                restrict: 'A',
                link: function(scope, element, attr) {
                    scope.$watch(attr.active, function(value) {
                        element[value ? 'addClass' : 'removeClass']('active');
                    });
                }
            };
        });
})();