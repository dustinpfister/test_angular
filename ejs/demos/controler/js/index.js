var app = angular.module('controlApp', []);

app.controller('FirstController', function ($scope) {

    $scope.first = 'james';
    $scope.last = 'bond';
    $scope.heading = 'Message: ';
    $scope.updateMessage = function () {

        $scope.message = 'Hello '+ $scope.first + ' ' + $scope.last;

    };

});
