var Hapi = require('hapi'),
fs = require('fs'),
ejs = require('ejs');

// create a new instance of hapi server
var server = new Hapi.Server();

// port 3000, and I will be using localhost
// when running I will connect via http://localhost:3000
server.connection({
    port: 3000,
    host: 'localhost'
});

// JavaScript path
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

            title: 'Angular Demos',
            layout: 'home'

        };

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

    }

});

server.route({

    method: 'GET',
    path: '/demos/{demoname}',
    handler: function (request, reply) {

        eData = {

            title: 'Angular demo',
            layout: 'demo',
            demoName: request.params.demoname

        };

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

    }

});

// start the server
server.start(function () {

    console.log('Angular demos hapi project is up: ');
    console.log('port: ' + server.info.port + '; host: ' + server.info.host);
    console.log('open in browser: ' + server.info.uri);

});
