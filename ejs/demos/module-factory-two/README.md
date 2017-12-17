# Module factory Demo

The goal here is to make a simple demo of a factory service in angular.

```html
<div ng-app="app" ng-controller="fact-control" >
 
    <p>mess: {{mess}}</p>
 
</div>
```

```js
var app = angular.module('app', []);
 
app.factory('Fact', function () {
 
    return {
 
        mess: 'I am a factory'
 
    };
 
});
 
app.controller('fact-control', function ($scope, Fact) {
 
    $scope.mess = Fact.mess
 
});
```