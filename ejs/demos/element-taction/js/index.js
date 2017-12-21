var app = angular.module('app', []);

// the taction
app.directive('taction', function ($timeout) {

    return {

        restrict: 'AE',
        replace: 'true',
        template: '<div><input type=\"button\" ng-click=\"actionClick()\"><canvas ng-show="showOn"></canvas></div>',
        link: function (scope, el, attr) {

            var container = el[0];
            var canvas = container.children[1];
            var button = container.children[0];

            canvas.width = 320;
            canvas.height = 20;
            canvas.style.background = '#000000';

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
                }

                console.log(scope.progress);

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

            button.value = 'action';

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
