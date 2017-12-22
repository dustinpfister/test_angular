var app = angular.module('app', []);


// the taction
app.directive('taction', function ($timeout) {

    return {

        restrict: 'AE',
        scope: {

            time: '@time'

        },
        template: '<div class=\"taction-container\"><input class=\"taction-input\" type=\"button\" ng-click=\"actionclick()\"><canvas class=\"taction-canvas\" ng-show="showOn"></canvas></div>',
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
                    scope.onprogress(scope.progress);

                }

                if (scope.progress === 1) {

                    scope.showOn = false;
                    scope.busy = false;
                    scope.onprogress(scope.progress);

                    scope.progress = 0;
                    scope.ondone();

                }

            };

            // when button is clicked
            scope.actionclick = function () {

                console.log(scope.time);

                if (!scope.busy) {

                    scope.busy = true;
                    scope.showOn = true;
                    scope.start = new Date();
                    scope.onclick();
                    scope.loop();

                }

            };

            // onclick method that can be set by a controller
            scope.onclick = scope.onclick || function () {

                console.log('define an onclick in the element');

            };

            // can set by element attribute (must be attached to window)
            if (attr.onclick) {

                scope.onClick = window[attr.onclick];

            }

            // onProgress method that can be set by a controller
            scope.onprogress = scope.onprogress || function (p) {

                console.log('progress = ' + p);

            };

            // can set by element attribute (must be attached to window)
            if (attr.onprogress) {

                scope.onprogress = window[attr.onprogress];

            }

            // onDone method that can be set by a controller
            scope.ondone = scope.ondone || function () {

                console.log('define an onDone in the element');

            };

            // can set by element attribute (must be attached to window)
            if (attr.ondone) {

                scope.ondone = window[attr.ondone];

            }

        }

    };

});
