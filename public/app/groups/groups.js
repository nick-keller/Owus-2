(function(){
    'use strict';

    angular.module('app')
        .controller('GroupsController', ['Group', 'user', '$scope', GroupsController]);

    function GroupsController(Group, user, $scope) {
        var vm = this;

        vm.loading = true;
        vm.groups = [];

        console.log(vm.groups);
        Group.query().$promise.then(function(groups) {
            vm.groups = groups;
            vm.loading = false;
            console.log(vm.groups);
        });

    }
})();