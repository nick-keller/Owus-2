(function() {
    'use strict';

    angular.module('app')
        .controller('TabsController', [TabsController])
        .directive('tabs', function() {
            return {
                templateUrl: 'components/tabs.html',
                restrict: 'A',
                scope: {
                    tabs: '=',
                    current: '='
                },
                controller: 'TabsController',
                controllerAs: 'ctrl',
                bindToController: true,
                link: function(scope, element, attr) {
                    element.addClass('tabs');

                    var $indicator = $('.indicator');

                    scope.$watch(function(){return scope.ctrl.current;}, function(id) {
                        element.find('a').each(function() {
                            var $tab = $(this);

                            if($tab.scope().tab.id === id) {
                                var targetLeft = $tab.offset().left;

                                if(targetLeft < $indicator.offset().left) {
                                    $indicator.addClass('left');
                                } else {
                                    $indicator.removeClass('left');
                                }

                                $indicator
                                    .css('left', targetLeft)
                                    .css('right', $(window).width() - targetLeft - $tab.outerWidth());
                            }
                        });
                    });
                }
            };
        });

    function TabsController() {
        var vm = this;

        vm.current = vm.current ? vm.current : vm.tabs[0].id;

        vm.isSelected = isSelected;
        vm.select = select;

        function isSelected(id) {
            return vm.current === id;
        }

        function select(id) {
            vm.current = id;
        }
    }
})();