(function(){
    'use strict';

    angular.module('app')
        .service('user', ['$cookies', 'jwtHelper', '$http', user]);

    function user($cookies, jwtHelper, $http) {
        var _self = this;

        _self.current = null;

        _self.isLoggedIn = isLoggedIn;
        _self.logIn = logIn;
        _self.logOut = logOut;
        _self.checkStatus = checkStatus;
        _self.getFromId = getFromId;
        _self.eq = eq;

        function isLoggedIn() {
            return _self.current !== null;
        }

        function logIn(accessToken) {
            $cookies.put('access_token', accessToken);
            _self.checkStatus();
        }

        function logOut() {
            $cookies.remove('access_token');
            _self.current = null;
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

        function getFromId(id, users) {
            if(!users) {
                users = _self.current.friends;
            }

            for(var i=0; i<users.length; ++i) {
                if(users[i]._id === id) {
                    return users[i];
                }
            }

            return null;
        }

        function eq(user1, user2) {
            return user1._id === user2._id;
        }
    }
})();