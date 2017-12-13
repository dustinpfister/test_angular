/*

ejs-api.js

This is an api I made to use for all my ejs files

 */

let fs = require('fs'),
marked = require('marked'),

api = {};

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

// add files property to the eData object
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

// add any readme data to the eData object
let addReadMe = function (eData) {

    return new Promise(function (resolve, reject) {

        // default to home readme
        let path = 'README.md';

        // if demo layout, try to get that readme
        if (eData.layout === 'demo') {

            path = './ejs/demos/' + eData.demoname + '/README.md';

        }

        fs.readFile(path, 'utf-8', function (e, data) {

            if (e) {

                eData.readme = '';

                reject(e);

            } else {

                eData.readme = marked(data);

                resolve(eData);

            }

        });

    });

};

// add all methods from api to the eData object
let addMethods = function (eData) {

    for (let method in api) {

        eData[method] = api[method].bind(eData);

    }

};

// merge the api into the given data object that will be used with ejs.renderFile
exports.merge = function (eData) {

    // return a promise
    return new Promise(function (resolve, reject) {

        // add files
        addFiles(eData).then(function (eData) {

            /*
            addMethods(eData);

            resolve(eData);
             */

            // add readMe
            addReadMe(eData).then(function () {

                addMethods(eData);

                resolve(eData);

            }).catch (function (e) {

                addMethods(eData);

                resolve(eData);

            });

        }).catch (function (e) {

            reject(e);

        });

    });

};
