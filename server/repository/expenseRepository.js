var _ = require('lodash');

module.exports.findWithUser = findWithUser;
module.exports.findDebtsOfUser = findDebtsOfUser;

function findWithUser(user, cb) {
    this.find({ $or: [
            {payer: user._id},
            {recipients: user._id}
        ]})
        .populate('payer recipients', '-friends -access_token -facebook_id -__v')
        .exec(cb);
}

function findDebtsOfUser(user, cb) {
    var eq = function(u1, u2) {
        return u1._id.equals(u2._id);
    };

    this
        .find({ $or: [
            {payer: user._id},
            {recipients: user._id}
        ]})
        .populate('payer recipients', '-friends -access_token -facebook_id -__v')
        .exec(function(err, expenses){
            if(err) {
                return cb(err);
            }

            var debts = [];

            expenses.forEach(function(expense){
                var pricePerUser =  Math.floor(expense.amount / expense.recipients.length * 100) /100;

                if(eq(expense.payer, user)) {
                    expense.recipients.forEach(function(recipient){
                        if(eq(recipient, user)) return;
                        addDebt(recipient, -pricePerUser, expense);
                    });
                } else {
                    addDebt(expense.payer, pricePerUser, expense);
                }
            });

            cb(null, debts);

            function addDebt(u, amount, expense) {
                var index = _.findIndex(debts, function(debt) {
                    return eq(debt.user, u);
                });

                if(!~index) {
                    index = debts.length;
                    debts.push({
                        user: u,
                        amount: 0,
                        expenses: []
                    });
                }

                debts[index].amount += amount;
                debts[index].expenses.push(expense);

                if(debts[index].amount == 0) {
                    debts[index].expenses = [];
                }
            }
        });
};