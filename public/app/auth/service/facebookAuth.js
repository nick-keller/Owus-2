(function(){
    'use strict';

    var config = {
        appId: '477371452438379',
        scope: 'public_profile,email'
    };

    angular.module('app')
        .service('facebookAuth', ['$window', facebookAuth])
        .run(['$window', 'facebookAuth', init]);

    function facebookAuth($window) {
        var _self = this;

        /**
         * Called when SDK is ready.
         */
        _self.ready = function() {
            $window.FB.getLoginStatus(_self.handleFacebookResponse);
        };

        /**
         * Called to trigger login.
         */
        _self.login = function() {
            $window.FB.login(_self.handleFacebookResponse, {scope: config.scope});
        };

        /**
         * Called when a connexion has been tried.
         */
        _self.handleFacebookResponse = function(response) {
            console.log(response);
        };
    }

    function init($window, facebookAuth) {
        $window.fbAsyncInit = function() {
            $window.FB.init({
                appId: config.appId,
                status: true,
                cookie: true,
                xfbml: true,
                version: 'v2.3'
            });

            facebookAuth.ready();
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
            js.src = '//connect.facebook.net/fr_FR/all.js';

            d.getElementsByTagName('body')[0].appendChild(js);

        }(document));
    }
})();