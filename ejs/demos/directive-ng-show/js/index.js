var app = angular.module('app', []);

app.controller('toggle', function ($scope) {

    $scope.showOn = true;
    $scope.showToggle = function () {

        $scope.showOn = !$scope.showOn;

    }

});
