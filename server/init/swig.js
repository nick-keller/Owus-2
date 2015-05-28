var swig = require('swig');
var path = require('path');

module.exports = init;

function init(app, viewsDirectory) {
    if(!viewsDirectory)
        viewsDirectory = path.join(__dirname, '../view');

    app.engine('html', swig.renderFile);
    app.set('view engine', 'html');
    app.set('views', viewsDirectory);
    app.set('view cache', false);
    swig.setDefaults({ cache: false });
}