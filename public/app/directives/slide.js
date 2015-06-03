(function() {
    'use strict';

    angular.module('app')
        .directive('slide', function() {
            return {
                restrict: 'A',
                link: function(scope, element, attr) {
                    scope.$watch(attr.slide, function(value) {
                        element[value ? 'slideUp' : 'slideDown']();
                    });
                }
            };
        });
})();