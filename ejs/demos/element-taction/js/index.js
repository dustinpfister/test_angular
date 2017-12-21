var app = angular.module('app', []);

// the taction
app.directive('taction', function ($timeout) {

    return {

        restrict: 'AE',
        replace: 'true',
        template: '<div><input type=\"button\" ng-click=\"actionClick()\"><canvas ng-show="showOn"></canvas></div>',
        link: function (scope, el, attr) {

            scope.container = el[0];
            scope.canvas = scope.container.children[1];
            scope.button = scope.container.children[0];

            scope.button.value = 'action';

            scope.canvas.width = 320;
            scope.canvas.height = 20;
            scope.canvas.style.background = '#000000';

            scope.showOn = false;
            scope.busy = false;
            scope.start = new Date();
            scope.time = 1000;
            scope.progress = 0;

            // the loop function
            scope.loop = function () {

                var now = new Date(),
                elapsed = now - scope.start;

                scope.progress = 1;

                if (elapsed < scope.time) {

                    $timeout(scope.loop, 33);

                    scope.progress = elapsed / scope.time;
                    scope.onProgress();

                }

                if (scope.progress === 1) {

                    scope.showOn = false;
                    scope.busy = false;
                    scope.progress = 0;
                    scope.onDone();

                }

            };

            // when button is clicked
            scope.actionClick = function () {

                if (!scope.busy) {

                    scope.busy = true;
                    scope.showOn = true;
                    scope.start = new Date();
                    scope.onClick();
                    scope.loop();

                }

            };

            // onclick method that can be set by a controller
            scope.onClick = scope.onClick || function () {

                console.log('define an onClick in your controller');

            };

            // onProgress method that can be set by a controller
            scope.onProgress = scope.onProgress || function () {

                console.log(scope.progress);

            };

            // onDone method that can be set by a controller
            scope.onDone = scope.onDone || function () {

                console.log('define an onClick in your controller');

            };

        }

    };

});

app.controller('ta-control', function ($scope) {

    // set my own onclick method here
    $scope.onClick = function () {

        console.log('okay so this is cool.');

    }

    // my own on done
    $scope.onDone = function () {

        console.log('okay the action is now done');

    }

});
