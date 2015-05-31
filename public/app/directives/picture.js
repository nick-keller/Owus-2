(function() {
    'use strict';

    angular.module('app')
        .directive('picture', function() {
            return {
                restrict: 'A',
                link: function(scope, element, attr) {
                    scope.$watch(attr.picture, function(value) {
                        element.css('background-image', 'url(' + value.picture + ')');
                        element.addClass('picture');
                    });
                }
            };
        });
})();