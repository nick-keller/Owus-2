(function(){
    'use strict';

    angular.module('app')
        .service('user', ['$cookies', 'jwtHelper', user]);

    function user($cookies, jwtHelper) {
        var _self = this;

        _self.current = null;

        _self.isLoggedIn = isLoggedIn;
        _self.logIn = logIn;
        _self.checkStatus = checkStatus;

        function isLoggedIn() {
            return _self.current !== null;
        }

        function logIn(accessToken) {
            $cookies.put('access_token', accessToken);
            _self.checkStatus();
        }

        function checkStatus() {
            var accessToken = $cookies.get('access_token');

            if(!accessToken || jwtHelper.isTokenExpired(accessToken)) {
                _self.current = null;
                return;
            }

            _self.current = jwtHelper.decodeToken(accessToken).user;
        }
    }
})();