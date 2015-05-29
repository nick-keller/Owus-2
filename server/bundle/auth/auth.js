var express = require('express');
var controller = require('./controller/authController');

var auth = express();
module.exports = auth;

auth.post('/auth', controller.auth);