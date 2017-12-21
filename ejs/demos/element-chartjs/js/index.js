var app = angular.module('app', []);

// basic directive example.
app.directive('chart', function () {

   // var index = 1;

    return {

        restrict: 'AE',
        replace: 'true',
        template: '<div><canvas></canvas></div>',
        link: function (scope, el, attr) {

            var container = el[0],
            canvas = container.children[0],
            datasets = attr.datasets.split(' ');

            scope.colors = attr.colors.split(';');
            scope.labels = attr.labels.split(';') || [];
            scope.sets = [];
            scope.width = attr.width || 640;

            container.style.width = scope.width + 'px';

            datasets.forEach(function (set, i) {

                scope.sets.push({

                    label: set.split('[')[0],
                    borderColor: scope.colors[i] || '#0000ff',
                    data: set.split('[')[1].split(';')

                });

            });

            scope.ctx = canvas.getContext('2d');
            scope.chart = new Chart(scope.ctx, {

                    type: attr.type || 'line',
                    data: {
                        labels: scope.labels,
                        datasets: scope.sets

                    }

                });

            //index += 1;

        }

    };

});
