var express = require('express');
var fs = require('fs');
var mongoose = require('mongoose');
var token = require('../auth/service/accessTokenMiddleware');
var path = require('path');
var _ = require('lodash');

var restful = express();
module.exports = restful;

restful.init = function() {

    var entities = getEntities();

    entities.forEach(function(entity) {
        var router = express.Router();

        registerGlobalMiddlewares();
        registerActions();

        restful.use(entity.endpoint, router);

        function registerGlobalMiddlewares() {
            router.use(token.check);

            _.forEach(entity.params, function(paramConverter, paramName) {
                router.param(paramName, paramConverter);
            });
        }

        function registerActions() {
            _.forEach(entity.actions, function(config) {

                router[config.method.toLowerCase()](config.path,
                    config.middleware
                );
            });
        }
    });
};

function getEntities() {

    var entities = [];
    var routingDir = path.join(__dirname, './routing');

    fs.readdirSync(routingDir).forEach(function (file) {
        if (~file.indexOf('.js') && !~file.indexOf('.swp')) {

            var entity = require(path.join(routingDir, file));
            entities.push(entity);
        }
    });

    return entities;
}