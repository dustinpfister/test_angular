# http-poet demo

This is an example on how to do a post request, with a new back end script messmaker.js


## HTML

```html
<div ng-app="httpPostMod" ng-controller="httpPostDemo">
 
    <ul ng-repeat="m in messages">
        <h3>date: {{m.date}}</h3>
        <p>mess: {{m.mess}}</p>
    </ul>
 
    <input type="text" ng-model="inputMess">
    <button ng-click='send()'>Send</button>
 
</div>
```

## JS (front end index.js)

```js
var app = angular.module('httpPostMod', []);
 
app.controller('httpPostDemo', function ($scope, $http) {
    //$scope.mess = 'loading...';
 
    $scope.inputMess = 'Hello Post!';
    $scope.messages = [];
 
    $scope.get = function () {
 
        $http.post('/back/messmaker', {
            action: 'get'
        }).then(function (res) {
 
            // if all goes well display the message
            $scope.messages = [];
            $scope.messages = res.data.messages;
 
        }).catch (function (e) {
 
            // display error info
            $scope.mess = e;
 
        });
 
    };
 
    $scope.send = function () {
        $http.post('/back/messmaker', {
            action: 'post',
            mess: $scope.inputMess
        }).then(function (res) {
 
            // if all goes well display the message
            // $scope.mess = res.data;
 
            console.log(res);
 
            $scope.get();
 
        }).catch (function (e) {
 
            // display error info
            //$scope.mess = e;
 
            $scope.get();
 
        });
 
    };
 
    $scope.get();
 
});
```

## JS (messmaker.js)

```js
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
```