(function() {
    'use strict';

    angular.module('app')
        .directive('money', function() {
            return {
                restrict: 'A',
                scope: {
                    model: '=ngModel'
                },
                require: 'ngModel',
                link: function(scope, element, attr, ngModel) {
                    ngModel.$parsers.push(function(viewValue) {
                        var val = parseFloat(viewValue);
                        return val ? val : undefined;
                    });

                    ngModel.$formatters.push(function(modelValue) {
                        return modelValue.toString();
                    });

                    var clean = function($this) {
                        var val = ngModel.$viewValue.toString();

                        val = val.replace(',', '.');
                        val = val.replace(' ', '');

                        if(val.match(/^-?\d+$/)) {
                            val = val + '.00';
                        } else if(val.match(/^\.\d$/)) {
                            val = '0' + val + '0';
                        } else if(val.match(/^\.\d{2}$/)) {
                            val = '0' + val;
                        } else if(val.match(/^$/)) {
                            val = '';
                        } else if(val.match(/^-?\d+\.$/)) {
                            val = val + '00';
                        } else if(val.match(/^-?\d+\.\d$/)) {
                            val = val + '0';
                        } else if(!val.match(/^-?\d+\.\d{2}$/)) {
                            val = '';
                        }

                        $this.val(val);
                        ngModel.$setViewValue(val, 'blur');
                    };

                    element.on('blur', function(){
                        clean($(this));
                    }).focus(function(){
                        var $this = $(this);
                        var val = $this.val();

                        if(val === '0.00') {
                            val = '';
                        } else if(val.match(/^-?\d+\.00$/)) {
                            val = val.replace('.00', '');
                        }

                        $this.val(val);
                    });

                    scope.$watch(function(){return scope.model;}, function(){
                        if(!element.is(':focus')) {
                            clean(element);
                        }
                    });
                }
            };
        });
})();