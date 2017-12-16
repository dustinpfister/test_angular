app.controller('disp', function ($scope, player) {

    var setValues = function () {

        $scope.money = player.money;
        $scope.workingTime = player.workingTime;
        $scope.workCompleteTime = player.workCompleteTime;
        $scope.workCount = player.workCount;
        $scope.level = player.level.level;

        // !! figuring this on the fly
        $scope.nextLevel = player.level.expForLevel($scope.level + 1);

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
