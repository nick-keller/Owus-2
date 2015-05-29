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
            endpoint: 'https://www.facebook.com',
            exchange_token: '/oauth/access_token'
        }
    },
    secret: parameters.secret
};