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
        },
        mine: {
            path: '/mine',
            method: 'GET',
            middleware: controller.mine
        },
        get: {
            path: '/:id',
            method: 'GET',
            middleware: crud.get
        },
        edit: {
            path: '/:id',
            method: 'PUT',
            middleware: crud.update
        },
        delete: {
            path: '/:id',
            method: 'DELETE',
            middleware: crud.remove
        }
    }
};