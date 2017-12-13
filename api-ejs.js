/*

ejs-api.js

This is an api I made to use for all my ejs files

 */

let fs = require('fs');

let api = {};

// simple test
api.foo = function () {

    return '<h1>bar<\/h1>';

};

// inject a ul of all info (string or number) in the eData object
api.info = function () {

    let html = '<ul>';

    for (let prop in this) {

        if (typeof this[prop] === 'string' || typeof this[prop] === 'number') {

            html += '<li>' + prop + ' : ' + this[prop] + '<\/l1>';

        }

    }

    return html + '<\/ul>';

};

// render a script tage for the current demo
api.js = function (filename) {

    return '<script src=\"/demos/' + this.demoname + '/js/' + filename + '\" ></script>';

    //return '';

};

// render a demos list (used on main index)
api.demosList = function () {

    let html = '<div class="list"><h2>Demos list<\/h2><ul>';

    this.files.forEach(function (demoname) {

        html += '<li><a href=\"/demos/' + demoname + '\">' + demoname + '<\/a><\/li>'

    });

    return html + '<\/ul><\/div>';

};

// async helpers

// add files property to eData
let addFiles = function (eData) {

    return new Promise(function (resolve, reject) {

        fs.readdir('./ejs/demos', function (e, files) {

            if (e) {

                reject(e);

            } else {

                eData.files = files;

                resolve(eData);

            }

        });

    });

};

// add all methods from api
let addMethods = function () {};

// merge the api into the given data object that will be used with ejs.renderFile
exports.merge = function (eData) {

    // return a promise
    return new Promise(function (resolve, reject) {

        // add files
        addFiles(eData).then(function (eData) {

            for (let method in api) {

                eData[method] = api[method].bind(eData);

            }

            resolve(eData);

        }).catch (function (e) {

            reject(e);

        });

    });

};
