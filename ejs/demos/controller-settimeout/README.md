# Controller settimeout Demo

Here I am using settimeout as a way of updating a $scope every once in a while.

## HTML

```html
<div ng-app="app" ng-controller="basic-control" >
 
    <p>money: {{money}}</p>
    <p>per tick: {{moneyPerTick}}</p>
    <p>tick rate: {{tickBaseRate}} / {{tickRate}} = {{ tickMS  }}</p>
 
</div>
```

## JS (index.js front end)

```js 
var app = angular.module('app', []);
 
app.controller('basic-control', function ($scope) {
 
    $scope.money = 0;
    $scope.moneyPerTick = 0.25;
 
    $scope.tickLast = new Date(); // last tick
    $scope.tickBaseRate = 10000; // the base number of ms that gets divided
    $scope.tickRate = 2; // ticks per second
    $scope.tickMS = $scope.tickBaseRate / $scope.tickRate;
 
    var loop = function () {
 
        var now = new Date();
 
        setTimeout(loop, 33);
 
        if (now - $scope.tickLast >= $scope.tickBaseRate / $scope.tickRate) {
 
            $scope.tickLast = now;
            $scope.money += $scope.moneyPerTick;
            $scope.$apply();
 
        }
 
    };
 
    loop();
 
});
```