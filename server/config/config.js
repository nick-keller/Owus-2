var parameters = require('./parameters');

module.exports = {
    mongodb: {
        host: parameters.mongodb_host,
        database: parameters.mongodb_name
    },
    facebook: {
        client_id: parameters.facebook_client_id,
        client_secret: parameters.facebook_client_secret,
        api: {
            endpoint: 'https://graph.facebook.com',
            exchange_token: '/v2.3/oauth/access_token',
            profile: '/v2.3/me?fields=id,name,first_name,last_name,gender,email,picture{url},friends',
            debug_token: '/debug_token'
        }
    },
    secret: parameters.secret
};