(function(){
    'use strict';

    angular.module('app')
        .controller('DebtsAddController', ['$rootScope', '$scope', DebtsAddController]);

    function DebtsAddController($rootScope, $scope) {
        var vm = this;

        vm.action = 'Ajouter';
        vm.expense = {
            payer: null,
            recipients: []
        };

        var submitListener = $rootScope.$on('validateDialog', function() {
            console.log('submit');
        });

        $scope.$on('$destroy', submitListener);
    }
})();