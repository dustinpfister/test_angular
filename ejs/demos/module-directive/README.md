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

## The object to return when making a directive.

The object that is returned when creating a directive needs to have the given properties.

* restrict - What the directive should be restricted to in html, In this demo it can be used as an Element or an attribute. If I want to use the directive as an element, attribute, and class I would want to set it to "AEC"

* replace - If set to true the directive will replace what may be inside the element with what is generated, else if false the content will be appended to whatever may be there to begin with.

* template - This is of course the html that is to be used. It does not have to be a simple string, it can involve other directives, and so forth.

* templateUrl - this can be used to link to an external template

* link - add custom $scope to a directive.

* compile - I use this if I need to do something once during the angular compile phase.

## directives and $scope of a controller

The new directive that I make does not get it's own scope, at least not out of the gate, instead it uses the scope of its parent element.

```js
app.directive('useController', function () {
 
    return {
 
        restrict: 'AE',
        replace: 'true',
        template: '<p>{{mess}}</p>'
 
    };
 
});
 
app.controller('the-controller', function ($scope) {
 
    $scope.mess = 'using the controller';
 
});
```

## adding $scope to a directive using the link property

If I want to add some custom stuff to $scope i can do so with the link property of the object

```js
app.directive('addScope', function () {
 
    return {
 
        restrict: 'AE',
        replace: 'true',
        template: '<p>{{mess}}</p>',
        link: function (scope, el, att) {
 
            if (!scope.mess) {
 
                scope.mess = 'this is some local stuff.';
 
            }
        }
 
    };
 
});
```

## the compile property

If I need to do something during the angular compile phase.