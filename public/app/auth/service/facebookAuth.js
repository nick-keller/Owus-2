(function(){
    'use strict';

    var config = {
        appId: '477371452438379',
        scope: 'public_profile,email,user_friends',
        sdk: '//connect.facebook.net/fr_FR/all.js'
    };

    angular.module('app')
        .service('facebookAuth', ['$window', facebookAuth]);

    /**
     * Facebook auth service
     * @param $window
     */
    function facebookAuth($window) {
        var _self = this;

        _self.inited = false;
        _self.loginCallback = null;

        _self.init = init;
        _self.login = login;
        _self.onLogin = onLogin;

        /**
         * Init Facebook SDK
         * @returns {facebookAuth}
         */
        function init() {

            if(_self.inited) {
                return;
            }

            _self.inited = true;

            $window.fbAsyncInit = function() {
                $window.FB.init({
                    appId: config.appId,
                    status: false,
                    cookie: false,
                    xfbml: true,
                    version: 'v2.3'
                });

                ready();
            };

            (function(d){
                // load the Facebook javascript SDK

                var js,
                    id = 'facebook-jssdk';

                if (d.getElementById(id)) {
                    return;
                }

                js = d.createElement('script');
                js.id = id;
                js.async = true;
                js.src = config.sdk;

                d.getElementsByTagName('body')[0].appendChild(js);

            }(document));

            return _self;
        }

        /**
         * Called when SDK is ready.
         */
        function ready() {
            $window.FB.getLoginStatus(handleFacebookResponse);
        }

        /**
         * Trigger login dialog.
         */
        function login() {
            $window.FB.login(handleFacebookResponse, {
                scope: config.scope,
                response_type: 'code'
            });
        }

        /**
         * Set a callback when the user successfully logs in.
         * @param callback
         * @returns {facebookAuth}
         */
        function onLogin(callback) {
            _self.loginCallback = callback;
            return _self;
        }

        /**
         * Called when a connexion has been tried.
         */
        function handleFacebookResponse(response) {
            if(response.status === 'connected' && _self.loginCallback) {
                _self.loginCallback(response.authResponse);
            }
        }
    }
})();