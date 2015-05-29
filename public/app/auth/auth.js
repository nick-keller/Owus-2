(function(){
    'use strict';

    angular.module('app')
        .controller('AuthController', ['facebookAuth', AuthController]);

    function AuthController(facebookAuth) {
        var vm = this;

        vm.login = facebookAuth.login;
    }
})();