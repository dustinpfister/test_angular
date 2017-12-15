var app = angular.module('app', []);

app.factory('player', function () {

    var player = {

        money: 0,

        workRate: .01, // the about of money made when clicking the work button
        workCompleteTime: 5000, // the amount of time it takes to complete a job

        working: false, // is the player currently working?
        workingStart: false, // is the player starting to work?
        workingStartTime: new Date, // the time the player started working
        workingTime: 0, // the amount of time in ms the player has worked so far


        workCount: 0,

        moneyPerTick: .25,

        tickLast: new Date(),
        tickBaseRate: 1000,
        tickRate: 10

    };

    player.tickMS = player.tickBaseRate / player.tickRate;

    return player;

});

app.controller('disp', function ($scope, player) {

    var setValues = function () {

        $scope.money = player.money;
        $scope.workingTime = player.workingTime;

    };

    setValues();

    // main app loop
    var loop = function () {

        var now = new Date();

        setTimeout(loop, 33);

        if (now - player.tickLast >= player.tickBaseRate / player.tickRate) {

            player.tickLast = now;

            // if the player started working
            if (player.workingStart) {

                player.workingStart = false;
                player.working = true;
                player.workingStartTime = now;
                player.workingTime = 0;

            }

            // i the player is working
            if (player.working) {

                player.workingTime = now - player.workingStartTime;

                if (player.workingTime > player.workCompleteTime) {

                    player.workingTime = player.workCompleteTime;

                }

                if (player.workingTime === player.workCompleteTime) {

                    player.workingTime = 0;
                    player.working = false;

                    player.workCount += 1;
                    player.money += player.workRate;
                    player.money = Number(player.money.toFixed(2));

                }

            }

            $scope.$apply();

        }

        //$scope.money = player.money;
        setValues();

    };

    loop();

});

app.controller('work', function ($scope, player) {

/*
    // set player values to $scope
    var setValues = function () {

        $scope.workCount = player.workCount;
        $scope.workRate = player.workRate;

    };

    setValues();
*/
    $scope.doWork = function () {

        if (!player.workingStart && !player.working) {

            player.workingStart = true;

        }

  //      setValues();

    };

});
