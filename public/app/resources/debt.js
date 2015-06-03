(function(){
    'use strict';

    angular.module('app')
        .factory('Debt', ['$resource', function($resource){
            return $resource('/api/me/debts');
        }])
})();