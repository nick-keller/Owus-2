var jwt = require('jwt-simple');
var request = require('request');
var config = require('../../../config/config');
var api = require('../../api/service/apiHelper');

module.exports.getNew = getNew;
module.exports.fbExchangeToken = fbExchangeToken;
module.exports.fbVerifyToken = fbVerifyToken;
module.exports.getProfile = getProfile;

/**
 * Get a new JWT access_token for a user
 * @param user
 * @returns {String} The JWT
 */
function getNew(user) {
    var claims = {
        exp: Math.floor(Date.now() / 1000) + 7 * 24 * 3600,
        user: {
            _id: user._id,
            name: user.name,
            picture: user.picture
        }
    };

    return jwt.encode(claims, config.secret, 'HS256');
}

function fbExchangeToken(token, callback) {
    request(
        {
            uri: config.facebook.api.endpoint + config.facebook.api.exchange_token,
            method: 'GET',
            qs: {
                grant_type: 'fb_exchange_token',
                client_id: config.facebook.client_id,
                client_secret: config.facebook.client_secret,
                fb_exchange_token: token
            }
        },
        function (error, response, body) {
            body = JSON.parse(body);
            callback(response.statusCode, body, body.access_token);
        }
    );
}

function fbVerifyToken(token, callback) {
    request(
        {
            uri: config.facebook.api.endpoint + config.facebook.api.debug_token,
            method: 'GET',
            qs: {
                access_token: config.facebook.client_id + '|' + config.facebook.client_secret,
                input_token: token
            }
        },
        function (error, response, body) {
            if(response.statusCode !== 200) {
                return callback(api.facebookError(JSON.parse(body)));
            }
            var data = JSON.parse(body).data;

            if(data.app_id !== config.facebook.client_id) {
                return callback(api.accessTokenForged());
            }
            callback();
        }
    );
}

function getProfile(token, callback) {
    request(
        {
            uri: config.facebook.api.endpoint + config.facebook.api.profile,
            method: 'GET',
            qs: {
                access_token: token
            }
        },
        function (error, response, body) {
            callback(response.statusCode, JSON.parse(body));
        }
    );
}