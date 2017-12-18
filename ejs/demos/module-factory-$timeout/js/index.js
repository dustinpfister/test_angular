var app = angular.module('app', []);

app.factory('loop', function ($timeout) {

    var state = {

        start: new Date(),
        count: 0

    },
    loop = function () {

        state.count += 1;

        $timeout(loop, 33);

    };

    loop();

    return {

        // grab the current count
        grab: function (func) {

            return state;

        }

    };

});

app.controller('fact-control', function ($scope, $timeout, loop) {

    $scope.grab = function () {

        var state = loop.grab();

        $scope.count = state.count;

    };

    var autoCheck = function () {

        $scope.grab();

        $timeout(autoCheck, 1000);

    }

    autoCheck();

});
