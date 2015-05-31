(function() {
    'use strict';

    angular.module('app')
        .directive('input', function() {
            return {
                restrict: 'E',
                link: function(scope, element, attr) {
                    element.on('keyup', function() {
                        element.toggleClass('empty', element.val() === '');
                    }).keyup();
                }
            };
        });
})();