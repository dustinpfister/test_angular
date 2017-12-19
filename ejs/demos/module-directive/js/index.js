var app = angular.module('app', []);

// basic directive example.
app.directive('firstDirective', function () {

    return {

        restrict: 'AE',
        replace: 'true',
        template: '<p>My own directive</p>'

    };

});

// use the $scope of a parent controller.
app.directive('useController', function () {

    return {

        restrict: 'AE',
        replace: 'true',
        template: '<p>{{mess}}</p>'

    };

});

app.controller('the-controller', function ($scope) {

    $scope.mess = 'uisng the controller';

});

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

/*
app.directive('useTemp', function () {

return {

restrict: 'AE',
replace: 'true',
templateUrl: 'temp.html'

};

});
*/
