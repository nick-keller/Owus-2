module.exports.missingParameter = missingParameter;
module.exports.formError = formError;
module.exports.mongooseError = mongooseError;
module.exports.notFound = notFound;
module.exports.accessTokenForged = accessTokenForged;
module.exports.userNotLogedIn = userNotLogedIn;
module.exports.tokenExpired = tokenExpired;
module.exports.facebookError = facebookError;
module.exports.accessDenied = accessDenied;

function notFound(what) {
    return {
        status: 404,
        message: what ? what + ' not found.' : 'Not found.'
    };
}

function missingParameter(parameter) {
    return {
        status: 400,
        error: 'missing_parameter',
        message: 'Required parameter is missing: ' + parameter
    };
}

function facebookError(response) {
    return {
        status: 500,
        error: 'facebook_error',
        message: 'Facebook did not answer as expected.',
        facebook_response: response
    };
}

function formError(err) {
    for(var field in err.errors) {
        if(err.errors.hasOwnProperty(field)) {
            err.errors[field] = err.errors[field].message;
        }
    }

    return {
        status: 400,
        message: 'Form data is not valid.',
        errors: err.errors
    };
}

function mongooseError(err) {
    if(err.name === 'ValidationError') {
        return formError(err);
    } else {
        return {
            error: 'mongoose_error',
            message: err.message
        };
    }
}

function userNotLogedIn() {
    return {
        status: 401,
        message: 'You must be loged in to access this page.'
    };
}

function accessTokenForged() {
    return {
        status: 400,
        error: 'access_token_forged',
        message: 'Access token is forged. Try logging-in again.'
    };
}

function tokenExpired() {
    return {
        status: 401,
        error: 'access_token_expired',
        message: 'User access token has expired.'
    };
}

function accessDenied() {
    return {
        status: 401,
        error: 'access_denied',
        message: 'This page is restricted.'
    };
}