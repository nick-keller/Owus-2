module.exports.friends = friends;

function friends(req, res) {
    res.json(req.user.friends);
}