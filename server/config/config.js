var parameters = require('./parameters');

module.exports = {
    mongodb: {
        host: parameters.mongodb_host,
        database: parameters.mongodb_name
    },
    secret: parameters.secret
};