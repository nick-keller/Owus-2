var _ = require('lodash');

module.exports.findGroupsOfUser = findGroupsOfUser;

function findGroupsOfUser(user, cb) {
    this.find({members: user._id})
        .populate('name')
        .exec(cb);
}