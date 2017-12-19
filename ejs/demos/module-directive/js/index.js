var app = angular.module('app', []);

app.directive('firstDirective', function () {

    return {

        restrict: 'AE',
        replace: 'true',
        template: '<p>My own directive</p>'

    };

});
