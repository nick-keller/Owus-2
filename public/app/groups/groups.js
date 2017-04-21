(function(){
    'use strict';

    angular.module('app')
        .controller('GroupsController', ['Group', 'user', '$scope', GroupsController]);

    function GroupsController(Group, user, $scope) {
        var vm = this;

        vm.loading = true;
        vm.groups = [];

        Group.query().$promise.then(function(groups) {
            console.log(groups);
            vm.groups = groups;
            vm.loading = false;
            console.log(vm.groups);
            console.log(user);
        });

    }
})();

//Dany = "55f2dc7ffad795fe057146c7"