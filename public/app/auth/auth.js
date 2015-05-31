(function(){
    'use strict';

    angular.module('app')
        .controller('AuthController', ['facebookAuth', '$http', 'user', '$state', AuthController]);

    function AuthController(facebookAuth, $http, user, $state) {
        var vm = this;

        vm.login = facebookAuth.login;
        vm.manualLogin = manualLogin;

        facebookAuth
            .init()
            .onLogin(onLogin);

        function manualLogin(accessToken) {
            onLogin({accessToken: accessToken});
        }

        function onLogin(response) {
            $http.post('/api/auth', {access_token: response.accessToken})
                .success(function(data, status) {
                    user.logIn(data.access_token);
                    $state.go('debts');
                })
                .error(function(data, status) {
                    console.log('error');
                });
        }
    }
})();