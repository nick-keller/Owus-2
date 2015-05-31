var accessToken = require('../service/accessTokenService');
var api = require('../../api/service/apiHelper');
var User = require('mongoose').model('User');

module.exports.auth = auth;

function auth(req, res, next) {
    var shortLivedToken = req.body.access_token;

    if(!shortLivedToken) {
        return next(api.missingParameter('access_token'));
    }

    accessToken.fbExchangeToken(shortLivedToken, function(status, response, longLivedToken) {
        if(status !== 200) {
            return next(api.facebookError(response));
        }

        var token = longLivedToken;

        accessToken.fbVerifyToken(token, function(error) {
            if(error) {
                return next(error);
            }

            accessToken.getProfile(token, function(status, profile) {
                if(status !== 200) {
                    return next(api.facebookError(profile));
                }

               User.findOne({facebook_id: profile.id}, function(err, user) {
                   if(err) {
                       return next(api.mongooseError(err));
                   }

                   if(!user) {
                       user = new User();
                   }

                   user.facebook_id = profile.id;
                   user.access_token = token;
                   user.picture = profile.picture.data.url;

                   ['name', 'first_name', 'last_name', 'email', 'gender'].forEach(function(prop) {
                       user[prop] = profile[prop];
                   });

                   var friendsFacebookIds = profile.friends.data.map(function(friend) {
                       return friend.id;
                   });

                   User.find({facebook_id: {$in: friendsFacebookIds}}).select('_id').exec(function(err, ids) {
                       if(err) {
                           return next(api.mongooseError(err));
                       }

                       user.friends = ids.map(function(friend) {
                           return friend._id;
                       });

                       user.save(function(err) {
                           if(err) {
                               return next(api.mongooseError(err));
                           }

                           res.json({
                               status: 200,
                               message: 'Successfully logged in.',
                               access_token: accessToken.getNew(user)
                           });
                       });
                   });
               });
            });
        });
    });
}