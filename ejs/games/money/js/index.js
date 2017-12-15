var app = angular.module('app', []);

app.factory('player', function () {

    var player = {

        money: 0,

        workRate: .01, // the about of money made when clicking the work button
        workCount: 0,

        moneyPerTick: .25,
        tickLast: new Date(),
        tickBaseRate: 1000,
        tickRate: 1,

    };

    player.tickMS = player.tickBaseRate / player.tickRate;

    return player;

});

app.controller('disp', function ($scope, player) {

    var setValues = function () {

        $scope.money = player.money;

    };

    setValues();

    // main app loop
    var loop = function () {

        var now = new Date();

        setTimeout(loop, 33);

        if (now - player.tickLast >= player.tickBaseRate / player.tickRate) {

            player.tickLast = now;

            $scope.$apply();

        }

        //$scope.money = player.money;
        setValues();

    };

    loop();

});

app.controller('work', function ($scope, player) {

    // set player values to $scope
    var setValues = function () {

        $scope.workCount = player.workCount;
        $scope.workRate = player.workRate;

    };

    setValues();

    $scope.doWork = function () {

        player.workCount += 1;
        player.money += player.workRate;
        player.money = Number(player.money.toFixed(2));

        setValues();

    };

});
