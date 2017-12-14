var app = angular.module('httpMod', []);

app.controller('httpDemo', function ($scope, $http) {
    $scope.mess = 'loading...';

    $http.get('/back/demo').then(function (res) {

        // if all goes well display the message
        $scope.mess = res.data;

    }).catch (function (e) {

        // display error info
        $scope.mess = e;

    });

});
