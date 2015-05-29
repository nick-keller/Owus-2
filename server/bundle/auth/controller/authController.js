var accessToken = require('../service/accessTokenService');
var api = require('../../api/service/apiHelper');
var User = require('mongoose').model('User');

module.exports.auth = auth;

function auth(req, res, next) {
    var shortLivedToken = req.body.access_token;

    if(!shortLivedToken) {
        return next(api.missingParameter('access_token'));
    }

    accessToken.fbExchangeToken(shortLivedToken, function(status, response) {
        console.log(status, response);
    });
}