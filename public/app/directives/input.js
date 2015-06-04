(function() {
    'use strict';

    angular.module('app')
        .directive('input', function() {
            return {
                restrict: 'E',
                require: 'ngModel',
                link: function(scope, element, attr, ngModel) {
                    element.on('keyup', function() {
                        element.toggleClass('empty', element.val() === '');
                    }).keyup();

                    scope.$watch(function(){return ngModel.$modelValue;}, function(val) {
                        element.toggleClass('empty', !val);
                    });
                }
            };
        });
})();