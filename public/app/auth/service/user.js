(function(){
    'use strict';

    angular.module('app')
        .service('user', ['$cookies', 'jwtHelper', '$http', user]);

    function user($cookies, jwtHelper, $http) {
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

            if(_self.current === null) {
                _self.current = jwtHelper.decodeToken(accessToken).user;
                _self.current.friends = [];

                $http.get('/api/me/friends')
                    .success(function(data) {
                        data.forEach(function(friend) {
                            _self.current.friends.push(friend);
                        });
                    })
                    .error(function(data) {
                        _self.current = null;
                    });
            }
        }
    }
})();