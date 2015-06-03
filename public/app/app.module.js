(function() {
    'use strict';

    var modules = [
        'ui.router',
        'templates',
        'ngCookies',
        'ngResource',
        'angular-jwt'
    ];
    angular.module('app', modules)
        .constant('_', window._);
})();