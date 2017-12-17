var app = angular.module('app', []);

app.factory('Fact', function () {

    return {

        mess: 'I am a factory'

    };

});

app.controller('fact-control', function ($scope, Fact) {

    $scope.mess = Fact.mess

});
