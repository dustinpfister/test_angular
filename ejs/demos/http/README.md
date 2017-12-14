# http demo

Here is a simple http demo that makes use of a back end script called demo.js.

## HTML

```html
<ul ng-app="httpMod" ng-controller="httpDemo">
    {{mess}}
</ul>
```

## JS (index.js front end)

```js
var app = angular.module('httpMod', []);
 
app.controller('httpDemo', function ($scope, $http) {
    $scope.mess = 'loading...';
 
    $http.get('/back/demo').then(function (res) {
 
        // if all goes well display the message
        $scope.mess = res.data;
 
    }).catch (function (e) {
 
        // display error info
        $scope.mess = e;
 
    });
 
});

```

## JS (demo.js backend)

This demo makes use of one of my backend scripts called demo.js. It just simply replies with a hard coded string that is a quote from the movie ghostbusters.

```js
exports.reply = function (request, h) {
 
    h('We are ready to believe you! ~Gostbusters');
 
};
```