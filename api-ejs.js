/*

ejs-api.js

This is an api I made to use for all my ejs files

 */

let api = {};

// simple test
api.foo = function () {

    return '<h1>bar<\/h1>';

};

// inject a ul of all info (string or number) in the eData object
api.info = function () {

    var html = '<ul>';

    for (var prop in this) {

        if (typeof this[prop] === 'string' || typeof this[prop] === 'number') {

            html += '<li>' + prop + ' : ' + this[prop] + '<\/l1>';

        }

    }

    return html + '<\/ul>';

};

// merge the api into the given data object that will be used with ejs.renderFile
exports.merge = function (data) {

    for (var method in api) {

        data[method] = api[method].bind(data);

    }

};
