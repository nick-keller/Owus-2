var parameters = require('../config/config.js');

module.exports = init;

function init(app) {
    require('./db')(parameters.mongodb);
    require('./swig')(app);
    require('./routing')(app, parameters.secret);
}