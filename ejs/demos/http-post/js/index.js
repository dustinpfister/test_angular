var app = angular.module('httpPostMod', []);

app.controller('httpPostDemo', function ($scope, $http) {
    //$scope.mess = 'loading...';

    $scope.messages = [

        // hard coded message
        {

            mess: 'loading messages...'

        }

    ];

    $scope.get = function () {

        $http.post('/back/messmaker', {
            action: 'get'
        }).then(function (res) {

            // if all goes well display the message
            $scope.messages = [];
            $scope.messages = res.data.messages;

        }).catch (function (e) {

            // display error info
            $scope.mess = e;

        });

    };

    $scope.send = function () {
        $http.post('/back/messmaker', {
            action: 'post',
            mess: 'ping!'
        }).then(function (res) {

            // if all goes well display the message
            // $scope.mess = res.data;

            console.log(res);

            $scope.get();

        }).catch (function (e) {

            // display error info
            //$scope.mess = e;

            $scope.get();

        });

    };

    $scope.send();

});
