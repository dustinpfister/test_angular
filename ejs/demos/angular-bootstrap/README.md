# angular.bootstrap demo

This is a demo of the angular bootstrap method that is useful if you want more than one angular app per page.

## html

```html
<div id="one" ng-app="one">
    <div ng-controller="control">
        <h1>{{mess}}</h1>
    </div>
</div>
 
<div id="two" ng-app="two">
    <div ng-controller="control">
        <h1>{{mess}}</h1>
    </div>
</div>
```

## JS

```js
angular.module('one', []).controller('control', function($scope) {
       $scope.mess = 'I am app one';
});
 
angular.module('two', []).controller('control', function($scope) {
       $scope.mess = 'I am app two';
});
 
angular.bootstrap(document.getElementById('two'),['two']);
```