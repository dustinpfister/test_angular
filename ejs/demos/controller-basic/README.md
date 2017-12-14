# Controller Basic Demo

This is just a basic use example of controllers in angular

## HTML
```html
<div ng-app="app" ng-controller="basic-control" >
 
    <p>{{mess}}</p>
 
</div>
```

## JS
```js
var app = angular.module('app', []);
 
app.controller('basic-control', function ($scope) {
 
    $scope.mess = 'hello world';
 
});
```