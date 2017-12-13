# Controller Demo

This is a simple demo for using a controller in angular

## HTML

```html
<div ng-app="controlApp" ng-controller="FirstController" >

    <span>Name: </span>
    <input type="text" ng-model="first">
    <input type="text" ng-model="last">
    <button ng-click='updateMessage()'>Message</button>
    <hr>
    {{heading + message}}
 
</div>
```

## JS
```js
var app = angular.module('controlApp', []);
 
app.controller('FirstController', function ($scope) {
 
    $scope.first = 'james';
    $scope.last = 'bond';
    $scope.heading = 'Message: ';
    $scope.updateMessage = function () {
 
        $scope.message = 'Hello '+ $scope.first + ' ' + $scope.last;
 
    };
 
});
 
```