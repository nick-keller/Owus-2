var mongoose = require('mongoose');
var Expense = mongoose.model('Expense');
var api = require('../service/apiHelper');
var _ = require('lodash');

module.exports.mine = mine;
module.exports.checkUser = checkUser;

function mine(req, res, next){
    Expense.findWithUser(req.user, function(err, expenses) {
        if(err) {
            return next(api.mongooseError(err));
        }

        res.json(expenses);
    });
}

function checkUser(req, res, next) {
    console.log(req.entity);
    if(req.entity.payer.equals(req.user._id)) {
        next();
    }

    if(_.some(req.entity.recipients, function(recipient) {
            return recipient.equals(req.user._id);
        })) {
        next();
    }

    next(api.accessDenied());
}