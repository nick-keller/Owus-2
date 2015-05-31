var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ExpenseSchema = new Schema({
    payer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: 'Vous devez indiquer qui paye'
    },
    amount: {
        type: Number,
        required: 'Vous devez indiquer un montant'
    },
    date: {
        type: Date,
        default: function() {return new Date()}
    },
    title: {
        type: String,
        required: 'Vous devez indiquer un motif'
    },
    recipients: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        required: 'Vous devez indiquer les participants',
        validate: {
            validator: function(val) {return !!val.length;},
            msg: 'Vous devez indiquer au moins un participant'
        }
    }
});

mongoose.model('Expense', ExpenseSchema);