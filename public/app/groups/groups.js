(function(){
    'use strict';

    angular.module('app')
        .controller('GroupsController', ['Group', 'user', '$scope', GroupsController]);

    function GroupsController(Group, user, $scope) {
        var vm = this;

        vm.loading = true;
        vm.groups = [];


    }
})();
