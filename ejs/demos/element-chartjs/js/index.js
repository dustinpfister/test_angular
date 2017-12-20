var app = angular.module('app', []);

// basic directive example.
app.directive('chart', function () {

    var index = 1;

    return {

        restrict: 'AE',
        replace: 'true',
        template: '<canvas></canvas>',
        /*
        compile: function (el,b) {

        return this.link

        },
         */

        link: function (scope, el, attr) {

            var el = el[0];

            scope.labels = attr.labels.split(';') || [];
            scope.sets = [];

            var datasets = attr.datasets.split(' ');

            datasets.forEach(function (set) {

                scope.sets.push({

                    label: set.split('[')[0],
                    borderColor: '#ff0000',
                    data: set.split('[')[1].split(';')

                });

            });

            scope.ctx = el.getContext('2d');
            scope.chart = new Chart(scope.ctx, {

                    type: attr.type || 'line',
                    data: {
                        labels: scope.labels,
                        datasets: scope.sets

                    }

                });

            index += 1;

        }

    };

});
