(function(){
    'use strict';

    angular.module('app')
        .factory('Group', ['$resource', function($resource){
            return $resource('/api/me/groups');
        }])
})();