var _ = require('lodash');

module.exports.getPopulatable = getPopulatable;

function getPopulatable(Model) {
    var fields = [];

    _.forEach(Model.schema.tree, function(field, name) {
        if(name[0] === '_') {
            return;
        }

        var type = field.type;

        if(Array.isArray(type)) {
            type = type[0];
        }

        if(typeof type === 'object' && type.type !== undefined) {
            type = type.type;
        }

        if(typeof type === 'function') {
            var ret = type.toString();
            ret = ret.substr('function '.length);
            ret = ret.substr(0, ret.indexOf('('));

            if(ret === 'ObjectId') {
                fields.push(name);
            }
        }
    });

    return fields.join(' ');
}