var controller = require('../controller/expenseController');
var Expense = require('mongoose').model('Expense');
var crud = require('../controller/crudController')(Expense);

module.exports = {
    endpoint: '/expenses',
    params: {
        id: crud.paramConverter
    },
    actions: {
        create: {
            path: '/',
            method: 'POST',
            middleware: crud.create
        }
    }
};