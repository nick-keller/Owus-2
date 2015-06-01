module.exports.findWithUser = findWithUser;

function findWithUser(user, cb) {
    this.find({ $or: [
            {payer: user._id},
            {recipients: user._id}
        ]})
        .populate('payer recipients', '-friends -access_token -facebook_id -__v')
        .exec(cb);
}