var mongoose = require('mongoose');
var Expense = mongoose.model('Expense');
var Group = mongoose.model('Group');
var api = require('../service/apiHelper');

module.exports.friends = friends;
module.exports.debts = debts;
module.exports.groups = groups;

function friends(req, res) {
    res.json(req.user.friends);
}

function debts(req, res, next) {
    Expense.findDebtsOfUser(req.user, function(err, debts) {
        if(err) {
            return next(api.mongooseError(err));
        }

        res.json(debts);
    });
}

function groups(req, res, next) {
    Group.findGroupsOfUser(req.user, function(err, groups) {
        if(err) {
            return next(api.mongooseError(err));
        }

        res.json(groups);
    });
}