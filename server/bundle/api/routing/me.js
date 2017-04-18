var controller = require('../controller/meController');

module.exports = {
    endpoint: '/me',
    params: {},
    actions: {
        friends: {
            path: '/friends',
            method: 'GET',
            middleware: controller.friends
        },
        debts: {
            path: '/debts',
            method: 'GET',
            middleware: controller.debts
        },
        groups: {
            path: '/groups',
            method: 'GET',
            middleware: controller.groups
        }
    }
};