# ng-show directive demo

The ngShow directive shows or hides the given HTML element based on the expression provided to the ngShow attribute. This can be a useful way to toggle the display of something on and off, such as a UI component of some kind that is part of a custom directive.

```html
<div ng-app="app" ng-controller="toggle">
 
    <div ng-show="showOn" class="ng-hide" >
        <p>Okay it is visable</p>
    </div>
    <input type="button" value="toggle show" ng-click="showToggle()">
 
</div>
```

```js
var app = angular.module('app', []);
 
app.controller('toggle', function ($scope) {
 
    $scope.showOn = true;
    $scope.showToggle = function () {
 
        $scope.showOn = !$scope.showOn;
 
    }
 
});
```