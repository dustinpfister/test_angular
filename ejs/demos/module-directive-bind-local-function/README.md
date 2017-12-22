# Bind a local function to the inner scope of a directive


## binding to a function defined in the $scope of a controller outside of the directive

So far it seems like it has to be done by defining some arguments for the element that is using the custom directive.

```html
<div ng-app="app">
 
 <div ng-controller="control">
     <div x-the-directive mess="foo" func="foo()">
         <p>Whats the default?</p>
     </div>
 </div>
 
</div>
```

```js
var app = angular.module('app', []);
 
app.controller('control', function($scope){
 
    $scope.foo = function(){
 
        alert('bar');
 
    };
 
});
 
// the taction
app.directive('theDirective', function ($timeout) {
 
    return {
 
        scope:{
            func : '&'
        },
        template: '<input type=\"button\" ng-click="func()" value=\"alert bar\">',
 
    }
 
});
```