# Element Chart JS

In this demo I am using angular to make a chart element.

This allows for an extension to html that works like this:

```html
<x-chart 
    type="line"
    width="320"
    labels="week1;week2;week3;week4"
    colors="red;blue"
    datasets="impressions[1024;700;650;1200 clicks[35;29;14;45"></x-chart>
```

```js
var app = angular.module('app', []);

// basic directive example.
app.directive('chart', function () {
 
    var index = 1;
 
    return {
 
        restrict: 'AE',
        replace: 'true',
        template: '<div><canvas></canvas></div>',
        link: function (scope, el, attr) {
 
            var container = el[0];
            var canvas = container.children[0];
 
            scope.colors = attr.colors.split(';');
            scope.labels = attr.labels.split(';') || [];
            scope.sets = [];
            scope.width = attr.width || 640;
            var datasets = attr.datasets.split(' ');
 
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
 
            index += 1;
 
        }
 
    };
 
});
```