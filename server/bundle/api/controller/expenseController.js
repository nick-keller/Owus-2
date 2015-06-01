var mongoose = require('mongoose');
var Expense = mongoose.model('Expense');
var api = require('../service/apiHelper');

module.exports.mine = mine;

function mine(req, res, next){
    Expense.findWithUser(req.user, function(err, expenses) {
        if(err) {
            return next(api.mongooseError(err));
        }

        res.json(expenses);
    });
}