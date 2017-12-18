# Module factory $timeout

Using $timeout in a factory module


```js
var app = angular.module('app', []);
 
app.factory('loop', function ($timeout) {
 
    // a state
    var state = {
 
        start: new Date(),
        time: 0,
        count: 0,
        ms: 250
 
    },
 
    // loop
    loop = function () {
 
        var now = new Date();
 
        state.time = now - state.start;
 
        state.count += 1;
 
        $timeout(loop, state.ms);
 
    };
 
    // start loop
    loop();
 
    // api
    return {
 
        // grab the current state
        grab: function (func) {
 
            return state;
 
        }
 
    };
 
});
 
app.controller('fact-control', function ($scope, loop) {
 
        // reference the state object
        var state = loop.grab();
        $scope.state = state;
 
});
```