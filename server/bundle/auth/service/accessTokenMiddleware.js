var jwt = require('jwt-simple');
var config = require('../../../config/config');
var api = require('../../api/service/apiHelper');
var User = require('mongoose').model('User');

module.exports.check = check;

function check(req, res, next) {
    if(!req.cookies || !req.cookies.access_token) {
        return next(api.userNotLogedIn());
    }

    var token;

    try {
        token = jwt.decode(req.cookies.access_token, config.secret);
    }
    catch(err) {
        return next(api.accessTokenForged());
    }

    if(token.exp < Date.now() / 1000) {
        return next(api.tokenExpired());
    }

    User.findOne({_id: token.user._id})
        .populate('friends', '_id name picture')
        .exec(function(err, user) {
            if(err) {
                return next(api.mongooseError(err));
            }

            req.user = user;
            next();
        });
}