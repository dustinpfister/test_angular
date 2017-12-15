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
        tickRate: 10,

        // what to do on each tick of a game loop
        tick: function (done) {

            var now = new Date();

            done = done || function () {}

            if (now - this.tickLast >= this.tickBaseRate / this.tickRate) {

                this.tickLast = now;

                // if the player started working
                if (this.workingStart) {

                    this.workingStart = false;
                    this.working = true;
                    this.workingStartTime = now;
                    this.workingTime = 0;

                }
                // i the player is working
                if (this.working) {

                    this.workingTime = now - this.workingStartTime;

                    if (this.workingTime > this.workCompleteTime) {

                        this.workingTime = this.workCompleteTime;

                    }

                    if (this.workingTime === this.workCompleteTime) {

                        this.workingTime = 0;
                        this.working = false;

                        this.workCount += 1;
                        this.money += this.workRate;
                        this.money = Number(this.money.toFixed(2));

                    }

                }

                // done with what needs to be done for player.tick
                done();

            }

        },

        doWork: function () {

            if (!this.workingStart && !this.working) {

                this.workingStart = true;

            }

        }

    };

    player.tickMS = player.tickBaseRate / player.tickRate;

    return player;

});

app.controller('disp', function ($scope, player) {

    var setValues = function () {

        $scope.money = player.money;
        $scope.workingTime = player.workingTime;
		$scope.workCompleteTime = player.workCompleteTime;

    };

    setValues();

    // main app loop
    var loop = function () {

        var now = new Date();

        setTimeout(loop, 33);

        // call player.tick
        player.tick(function () {

            $scope.$apply();

        });

        //$scope.money = player.money;
        setValues();

    };

    loop();

});

app.controller('work', function ($scope, player) {

    $scope.doWork = function () {

        player.doWork();

    };

});
