var Hapi = require('hapi'),
ejs = require('ejs');

// create a new instance of hapi server
var server = new Hapi.Server();

// port 3000, and I will be using localhost
// when running I will connect via http://localhost:3000
server.connection({
    port: 3000,
    host: 'localhost'
});

// set a route
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {

        ejs.renderFile(

            './ejs/index.ejs',

            eData,

            function (e, html) {

                reply(html);

            }

        );

    }

});

/*
// register plug ins
server.register(

// I could just have the one object, but yes
// I can also pass an array of objects for each plugin I
// am using
[

// inert plug in{
register : require('inert')

}
],

// callback
function (err) {

if (err) {
throw err;
}

// set a route
server.route({
method : 'GET',
path : '/{param*}',
handler : {

directory : {
path : 'static-public'
}

}
});

}

);
 */

// start the server
server.start(function () {

    console.log('hapi server up: ');

});
