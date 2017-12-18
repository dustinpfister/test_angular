var Hapi = require('hapi'),
fs = require('fs'),

APIEJS = require('./lib/api-ejs');

// create a new instance of hapi server
var server = new Hapi.Server();

// port 3000, and I will be using localhost
// when running I will connect via http://localhost:3000
server.connection({
    port: 3000,
    host: 'localhost'
});

/********* ********* ********* *********
lib (node_modules)
 ********* ********* ********* *********/

// lib path is for getting a certain client side js file
// that is in the node_modules folder.
server.route({

    method: 'GET',
    path: '/lib/{modname}/{filename}',
    handler: function (request, reply) {

        var modname = request.params.modname,
        filename = request.params.filename,
        path = './node_modules/' + modname + '/' + filename;

        // attempt to get the file
        fs.readFile(path, 'utf-8', function (e, data) {

            if (e) {

                reply('// error with ' + path + ' : ' + e);

            } else {

                reply(data).type('text');

            }

        });

    }

});

/********* ********* ********* *********
Home /
 ********* ********* ********* *********/

// main index
server.route({
    method: 'GET',
    path: '/',

    handler: function (request, reply) {

        APIEJS.withIndex({

            title: 'Angular Demos - Home',
            layout: 'home',
            name: '' // empty string for the current demo name for now

        }, request, reply);

    }

});

/********* ********* ********* *********
Images
 ********* ********* ********* *********/

// images path
server.route({

    method: 'GET',
    path: '/img/{filename}',
    handler: function (request, h) {

        fs.readFile('./img/' + request.params.filename, 'binary', function (e, img) {

            if (e) {

                h(e);

            } else {

                // works
                // h(img).header('Content-type','image/png').encoding('binary');

                // works
                h(img).encoding('binary').type('image/png');

            }

        });

    }

});

/********* ********* ********* *********
Images
 ********* ********* ********* *********/

// images path
server.route({

    method: 'GET',
    path: '/css/{filename}',
    handler: function (request, h) {

        fs.readFile('./ejs/css/' + request.params.filename, 'utf-8', function (e, css) {

            if (e) {

                h(e);

            } else {

                h(css).type('text/css');

            }

        });

    }

});

/********* ********* ********* *********
Front end *.js files (all pages)
 ********* ********* ********* *********/

// *.js files path for all pages ( /js/angular/1.6.7/angular.js )
server.route({

    method: 'GET',
    path: '/js/{project}/{v}/{filename}',
    handler: function (request, reply) {

        var project = request.params.project,
        version = request.params.v,
        filename = request.params.filename;

        var path = './ejs/js/' + project + '/' + version + '/' + filename;

        // attempt to get the file
        fs.readFile(path, 'utf-8', function (e, data) {

            if (e) {

                console.log(e);

                reply(e);

            } else {

                reply(data).type('application/javascript');

            }

        });

    }

});

/********* ********* ********* *********
Demos
 ********* ********* ********* *********/

// main demo index path
server.route({

    method: 'GET',
    path: '/demos',
    handler: function (request, reply) {

        APIEJS.withIndex({

            title: 'Angular demo - ' + request.params.name,
            layout: 'demo_index',
            name: ''

        }, request, reply);

    }

});

// demos folder for a certain demo
server.route({

    method: 'GET',
    path: '/demos/{name}',
    handler: function (request, reply) {

        APIEJS.withIndex({

            title: 'Angular demo - ' + request.params.name,
            layout: 'demo',
            name: request.params.name,
            angular: {

                version: '1.6.7',
                fn: 'angular.js'

            }

        }, request, reply);

    }

});

// Demos *.js files path
server.route({

    method: 'GET',
    path: '/demos/{name}/js/{filename}',
    handler: function (request, reply) {

        var path = './ejs/demos/' + request.params.name + '/js/' + request.params.filename;

        // attempt to get the file
        fs.readFile(path, 'utf-8', function (e, data) {

            if (e) {

                reply(e);

            } else {

                reply(data).type('application/javascript');

            }

        });

    }

});

/********* ********* ********* *********
Back End
 ********* ********* ********* *********/

// back end scripts GET
server.route({

    method: 'GET',
    path: '/back/{script}',
    handler: function (request, reply) {

        var script = request.params.script;

        try {

            require('./backends/' + script + '.js').reply(request, reply);

        } catch (e) {

            reply(e);

        }

    }

});

// back end scripts POST
server.route({

    method: 'POST',
    path: '/back/{script}',
    handler: function (request, reply) {

        var script = request.params.script;

        try {

            require('./backends/' + script + '.js').reply(request, reply);

        } catch (e) {

            reply(e);

        }

    }

});

/********* ********* ********* *********
games
 ********* ********* ********* *********/
// main games index path
server.route({

    method: 'GET',
    path: '/games',
    handler: function (request, reply) {

        APIEJS.withIndex({

            title: 'Angular games',
            layout: 'game_index',
            name: ''

        }, request, reply);

    }

});

// get a certain game
server.route({

    method: 'GET',
    path: '/games/{name}',
    handler: function (request, reply) {

        APIEJS.withIndex({

            title: 'Angular game - ' + request.params.name,
            layout: 'game',
            name: request.params.name

        }, request, reply);
    }

});

// games *.js files path
server.route({

    method: 'GET',
    path: '/games/{name}/js/{filename}',
    handler: function (request, reply) {

        var path = './ejs/games/' + request.params.name + '/js/' + request.params.filename;

        // attempt to get the file
        fs.readFile(path, 'utf-8', function (e, data) {

            if (e) {

                reply(e);

            } else {

                reply(data).type('application/javascript');

            }

        });

    }

});

// start the server
server.start(function () {

    console.log('Angular demos hapi project is up: ');
    console.log('port: ' + server.info.port + '; host: ' + server.info.host);
    console.log('open in browser: ' + server.info.uri);

});
