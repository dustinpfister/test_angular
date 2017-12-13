# First angular demo

This is my first angular demo for my [test_angular](https://github.com/dustinpfister/test_angular) project

In this project I am presenting just a simple angular hello world example.

## html
```html
<div ng-app="first">
    <div ng-controller="control">
        <h1>{{greeting}}</h1>
    </div>
</div>
```

## js
```js
var app = angular.module('first', []);

app.controller('control', function($scope) {
       $scope.greeting = 'Hello World';
});
```