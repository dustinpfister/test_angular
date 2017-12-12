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

server.route({

    method: 'GET',
    path: '/js/{modname}/{filename}',
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

// root path
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {

        eData = {};

        ejs.renderFile(

            './ejs/layout.ejs',

            eData,

            function (e, html) {

            if (e) {

                reply(e);

            }

            reply(html);

        });

    }

});

// start the server
server.start(function () {

    console.log('hapi server up: ');

});
