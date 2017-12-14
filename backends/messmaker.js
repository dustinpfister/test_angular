// backend messmaker script

var fs = require('fs'),

// check for messmaker.json
jsonCheck = function () {

    return new Promise(function (resolve, reject) {

        fs.stat('./backends/messmaker.json', function (e, json) {

            if (e) {

                reject(e);

            }

            resolve(json);

        });

    });

},

// make messmaker.json
mkJson = function () {

    return new Promise(function (resolve, reject) {

        var json = JSON.stringify({

                messages: [

                    // first
                    {
                        date: new Date(),
                        mess: 'new json file made!'

                    }, {

                        date: new Date(),
                        mess: 'these are hard coded on the server.'

                    }

                ]

            });

        fs.writeFile('./backends/messmaker.json', json, 'utf-8', function (e) {

            if (e) {

                reject(e);

            }

            resolve(json);

        });

    });

},

// get messmaker.json
getJson = function () {

    return new Promise(function (resolve, reject) {

        fs.readFile('./backends/messmaker.json', 'utf-8', function (e, json) {

            if (e) {

                reject(e);

            }

            resolve(json);

        });

    });

},

pushMess = function (mess) {

    return new Promise(function (resolve, reject) {

        jsonCheck()

        .then(function () {

            return getJson();

        })

        // write mess
        .then(function (json) {

            json = JSON.parse(json);

            json.messages.push({

                date: new Date(),
                mess: mess

            });

            if (json.messages.length > 10) {

                json.messages.shift();

            }

            //resolve(json);

            json = JSON.stringify(json);

            fs.writeFile('./backends/messmaker.json', json, 'utf-8', function (e) {

                if (e) {

                    reject(e);

                }

                resolve(json);

            });

        })

        // error
        .catch (function () {

            reject(e);

        })

    });

};

exports.reply = function (request, h) {

    var payload = request.payload;

    if (payload.action === 'get') {

        // check for json
        jsonCheck().then(function (json) {

            //h(json);

            return getJson();

        })

        // then send it if its there
        .then(function (json) {

            h(json);

        })

        // if no messmaker.json
        .catch (function (e) {

            // make one
            mkJson().then(function (json) {

                // and send it
                h(json);

            }).catch (function () {

                h(e.message);

            });

        });

    } else {

        pushMess(payload.mess).then(function (json) {

            h(json);

        }).catch (function (e) {

            h(e.messge);

        });

    }

};
