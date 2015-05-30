(function() {
    'use strict';

    angular.module('app')
        .directive('toggle', function() {
            return {
                restrict: 'A',
                scope: {
                    toggle: '='
                },
                link: function(scope, element, attr) {
                    element.on('click', function() {
                        scope.$apply(function() {
                            scope.toggle = !scope.toggle;
                        });
                    });
                }
            };
        });
})();