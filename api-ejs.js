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

api.demosList = function () {

    let html = '<div class="list"><h2>Demos list<\/h2><ul>';

    this.files.forEach(function (demoname) {

        html += '<li><a href=\"/demos/'+demoname+'\">' + demoname + '<\/a><\/li>'

    });

    return html + '<\/ul><\/div>';

    /*
    var html = '<ul>';

    return fs.readdir('./ejs/demos', function (e, files) {

    if (e) {

    html += '<li>' + e + '<\/li>';

    } else {

    html += '<li>okay<\/li>';

    }

    console.log(e);
    console.log(files);

    return html + '<\/ul>';

    });
     */

};

// merge the api into the given data object that will be used with ejs.renderFile
exports.merge = function (data) {

    return new Promise(function (resolve, reject) {

        fs.readdir('./ejs/demos', function (e, files) {

            if (e) {

                reject(e);

            } else {

                data.files = files;

                for (let method in api) {

                    data[method] = api[method].bind(data);

                }

                resolve(data);

            }

        });

    });

};

/*
// merge the api into the given data object that will be used with ejs.renderFile
exports.merge = function (data) {

for (let method in api) {

data[method] = api[method].bind(data);

}

};
*/
