var Hapi = require('hapi'),
fs = require('fs'),
ejs = require('ejs'),

APIEJS = require('./api-ejs');

// create a new instance of hapi server
var server = new Hapi.Server();

// port 3000, and I will be using localhost
// when running I will connect via http://localhost:3000
server.connection({
    port: 3000,
    host: 'localhost'
});

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

// main index
server.route({
    method: 'GET',
    path: '/',

    handler: function (request, reply) {

        eData = {

            title: 'Angular Demos - Home',
            layout: 'home'

        };

        //ejsApi.merge(eData);

        APIEJS.merge(eData).then(function (eData) {

            console.log('okay');

            console.log(eData);

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

            // if there is some kind of problem with apiEjs.merge
            reply(e);

        });

    }

});

// demos folder
server.route({

    method: 'GET',
    path: '/demos/{demoname}',
    handler: function (request, reply) {

        eData = {

            title: 'Angular demo - ' + request.params.demoname,
            layout: 'demo',
            demoname: request.params.demoname

        };

        APIEJS.merge(eData).then(function (eData) {

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

        })

    }

});

// demos folder
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

// get demos *.js files
server.route({

    method: 'GET',
    path: '/demos/{demoname}/js/{filename}',
    handler: function (request, reply) {

        var path = './ejs/demos/' + request.params.demoname + '/js/' + request.params.filename;

        // attempt to get the file
        fs.readFile(path, 'utf-8', function (e, data) {

            if (e) {

                reply(e);

            } else {

                reply(data).type('text');

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
