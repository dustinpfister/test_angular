var app = angular.module('app', []);

app.factory('player', function () {

    var player = {

        money: 0,
        moneyPerTick: .25,
        tickLast: new Date(),
        tickBaseRate: 1000,
        tickRate: 1,

    };

    player.tickMS = player.tickBaseRate / player.tickRate;

    return player;

});

app.controller('disp', function ($scope, player) {

    $scope.money = player.money;

    // main app loop
    var loop = function () {

        var now = new Date();

        setTimeout(loop, 33);

        if (now - player.tickLast >= player.tickBaseRate / player.tickRate) {

            $scope.money = player.money;

            player.tickLast = now;
            player.money += player.moneyPerTick;
            $scope.$apply();

        }

    };

    loop();

});

app.controller('two', function ($scope, player) {

    $scope.getMoney = function () {

        $scope.money = player.money;

    };

    $scope.getMoney();

});
