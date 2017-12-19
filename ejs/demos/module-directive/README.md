# Module directive Demo

In this demo the aim is to make my own angular directives using the directive method fomr the module api.

```html
<div ng-app="app">
 
   <div first-directive></div>
 
</div>
```


```js
var app = angular.module('app', []);
 
app.directive('firstDirective', function () {
 
    return {
 
        restrict: 'AE',
        replace: 'true',
        template: '<p>My own directive</p>'
 
    };
 
});
```