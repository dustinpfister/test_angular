var app = angular.module('app', []);

// the taction
app.directive('taction', function ($timeout) {

    return {

        restrict: 'AE',
        replace: 'true',
        template: '<div class=\"taction-container\"><input class=\"taction-input\" type=\"button\" ng-click=\"actionClick()\"><canvas class=\"taction-canvas\" ng-show="showOn"></canvas></div>',
        link: function (scope, el, attr) {

            scope.container = el[0];
            scope.canvas = scope.container.children[1];
            scope.ctx = scope.canvas.getContext('2d');
            scope.button = scope.container.children[0];

            scope.canvas.width = 320;
            scope.canvas.height = 20;

            // !!! setting some style here
            scope.button.value = 'action';
            scope.button.style.paddingTop = '0px';
            scope.button.style.float = 'left';
            scope.container.style.height = '20px';

            scope.showOn = false;
            scope.busy = false;
            scope.start = new Date();
            scope.time = attr.time || 1000;
            scope.progress = 0;

            // the loop function
            scope.loop = function () {

                var now = new Date(),
                ctx = scope.ctx,
                elapsed = now - scope.start;

                scope.progress = 1;

                if (elapsed < scope.time) {

                    $timeout(scope.loop, 33);

                    scope.progress = elapsed / scope.time;

                    scope.ctx.fillStyle = '#8a8a8a';
                    scope.ctx.fillRect(0, 0, scope.canvas.width, scope.canvas.height);

                    scope.ctx.fillStyle = '#008a00';
                    scope.ctx.fillRect(0, 0, scope.canvas.width * scope.progress, scope.canvas.height);

                    scope.onProgress(scope.progress);

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

            // can set by element attribute (must be attached to window)
            if (attr.onclick) {

                scope.onClick = window[attr.onclick];

            }

            // onProgress method that can be set by a controller
            scope.onProgress = scope.onProgress || function () {

                console.log(scope.progress);

            };

            // can set by element attribute (must be attached to window)
            if (attr.onProgress) {

                scope.onProgress = window[attr.ooprogress];

            }

            // onDone method that can be set by a controller
            scope.onDone = scope.onDone || function () {

                console.log('define an onClick in your controller');

            };

            // can set by element attribute (must be attached to window)
            if (attr.onDone) {

                scope.onDone = window[attr.ondone];

            }

        }

    };

});

app.controller('ta-control', function ($scope) {

    // set my own onclick method here
    //$scope.onClick = function () {

    //    console.log('okay so this is cool.');

    //};

    // my own on progress
    $scope.onProgress = function () {};

    // my own on done
    $scope.onDone = function () {

        console.log('okay the action is now done');

    };

});
