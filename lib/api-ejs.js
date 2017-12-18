/*

ejs-api.js

This is an api I made to use for all my ejs files

 */

let fs = require('fs'),
marked = require('marked'),
ejs = require('ejs'),
yaml = require('js-yaml'),
path = require('path'),
_ = require('lodash'),

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

    return '<script src=\"/' + this.layout + 's/' + this.name + '/js/' + filename + '\" ></script>';

    //return '';

};

// render a demos list (used on main index)
api.demosList = function () {

    let html = '<div class="list"><h2>Demos list<\/h2><ul>';

    this.demos.forEach(function (name) {

        html += '<li><a href=\"/demos/' + name + '\">' + name + '<\/a><\/li>'

    });

    return html + '<\/ul><\/div>';

};

// render a demos list (used on main index)
api.gamesList = function () {

    let html = '<div class="list"><h2>Games list<\/h2><ul>';

    this.games.forEach(function (name) {

        html += '<li><a href=\"/games/' + name + '\">' + name + '<\/a><\/li>'

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

                eData.demos = files;

                resolve(eData);

            }

        });

    }).then(function (eData) {

        return new Promise(function (resolve, reject) {

            fs.readdir('./ejs/games', function (e, files) {

                if (e) {

                    reject(e);

                } else {

                    eData.games = files;

                    resolve(eData);

                }

            });

        });

    });

};

// add any readme data to the eData object
let addReadMe = function (eData) {

    return new Promise(function (resolve, reject) {

        // default to home readme
        let path = 'README.md';

        // if demo layout, try to get that readme
        if (eData.layout != 'home') {

            path = './ejs/' + eData.layout + 's/' + eData.name + '/README.md';

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

/*
// just give what we have as a promise
let giveAsPromise = function (eData) {

return new Promise(function (resolve) {

resolve(eData);

});

};
 */

// check for a conf.yaml file
let yamlCheck = function (request) {

    return new Promise(function (resolve, reject) {

        fs.readFile(

            path.join('./ejs', request.path, 'conf.yaml'),
            'utf-8',
            function (e, data) {

            if (e) {

                reject(e);

            }

            try {

                data = yaml.safeLoad(data)

                    resolve(data);

            } catch (e) {

                reject(e);

            }

        });

    });

};

// with index helper (render with index.ejs)
exports.withIndex = function (eData, request, reply) {

    let self = this;

    yamlCheck(request).then(function (data) {

        console.log('yaml:');

        console.log(data);

        // merge in yaml settings
        _.merge(eData, data);

		console.log(eData);
		
        return self.merge(eData);

    }).catch (function (e) {

        // if error reading conf.yaml for the path
        eData.angular = {

            version: '1.6.7',
            fn: 'angular.js'

        };

        return self.merge(eData);

    })
        .then(function (eData) {

            // render the index.ejs of the demo folder
            ejs.renderFile(

                './ejs/index.ejs',

                eData,

                function (e, html) {

                if (e) {

                    reply(e);

                } else {

                    reply(html);

                }

            });

        }).catch (function (e) {

            reply(e);

        });

};

// merge the api into the given data object that will be used with ejs.renderFile
exports.merge = function (eData) {

    // add files
    return addFiles(eData)

    // then add readme
    .then(function (eData) {

        return addReadMe(eData);

    })

    // then add methods
    .then(function (eData) {

        addMethods(eData);

        return eData;

    })

    // catch
    .catch (function (e) {

        addMethods(eData);

        return eData;

    });

};
