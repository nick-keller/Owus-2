var path = require('path');
var api = require('../service/apiHelper');
var mi = require('../service/modelIntrospection');

module.exports = function(Model) {

    return {
        paramConverter: paramConverter,
        get: get,
        create: create,
        update: update,
        remove: remove,
        search: search
    };

    function paramConverter(req, res, next, id) {
        Model.findById(id)
            //.populate(mi.getPopulatable(Model))
            .exec(function(err, data) {
                if(err) {
                    return next(api.mongooseError(err));
                }

                if(!data) {
                    return next(api.notFound(Model.modelName));
                }

                req.entity = data;
                next();
            });
    }

    function get(req, res) {
        res.json(req.entity);
    }

    function create(req, res, next) {

        (new Model(req.body)).save(function(err, data) {
            if(err) {
                return next(api.mongooseError(err));
            }

            res.status(201).json(data);
        });
    }

    function update(req, res, next) {

        Model.findOneAndUpdate(
            { _id: req.entity._id },
            { $set: req.body },
            { runValidators: true },
            function(err) {
                if(err) {
                    return next(api.mongooseError(err));
                }

                res.json({
                    status: 200,
                    message: Model.modelName + ' successfully updated.'
                });
            }
        );
    }

    function remove(req, res, next) {
        Model.findOneAndRemove(
            { _id: req.entity._id },
            function(err, data) {
                if(err) {
                    return next(api.mongooseError(err));
                }

                res.json({
                    status: 200,
                    message: Model.modelName + ' successfully removed.'
                });
            }
        );
    }

    function search(req, res, next) {
        Model.find(req.body)
            .populate(mi.getPopulatable(Model))
            .exec(function(err, data) {
                if(err) {
                    return next(api.mongooseError(err));
                }

                res.json(data);
            });
    }
};