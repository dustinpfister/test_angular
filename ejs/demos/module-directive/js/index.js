var app = angular.module('app', []);

app.directive('firstDirective', function () {

    return {

        restrict: 'AE',
        replace: 'true',
        template: '<p>My own directive</p>'

    };

});

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

/*
app.directive('useTemp', function () {

return {

restrict: 'AE',
replace: 'true',
templateUrl: 'temp.html'

};

});
*/
