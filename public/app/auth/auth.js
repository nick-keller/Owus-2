(function(){
    'use strict';

    angular.module('app')
        .controller('AuthController', ['facebookAuth', '$http', AuthController]);

    function AuthController(facebookAuth, $http) {
        var vm = this;

        vm.login = facebookAuth.login;

        facebookAuth
            .init()
            .onLogin(onLogin);

        function onLogin(response) {
            $http.post('/api/auth', {access_token: response.accessToken})
                .success(function(data, status) {
                    console.log('success');
                })
                .error(function(data, status) {
                    console.log('error');
                });
        }
    }
})();