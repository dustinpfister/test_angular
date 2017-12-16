app.controller('disp', function ($scope, $timeout, player, work) {

    var setValues = function () {

        $scope.money = player.money;

        $scope.workingTime = work.workingTime;

        $scope.workCompleteTime = work.workCompleteTime;

        $scope.workCount = work.workCount;
        $scope.level = work.level.level;

        // !! figuring this on the fly
        $scope.nextLevel = work.level.expForLevel($scope.level + 1);

    };

    setValues();

    // main app loop
    var loop = function () {

        var now = new Date();

        $timeout(loop, 33);

        // call player.tick
        player.tick();

        //$scope.money = player.money;
        setValues();

    };

    loop();

});

app.controller('work', function ($scope, $timeout, work) {

    var setValues = function () {

        $scope.workingTime = work.workingTime;

        $scope.workCompleteTime = work.workCompleteTime;

        $scope.workCount = work.workCount;
        $scope.level = work.level.level;

        // !! figuring this on the fly
        $scope.nextLevel = work.level.expForLevel($scope.level + 1);

    };

    setValues();

    $scope.doWork = function () {

        work.doWork();

    };

    var loop = function () {

        $timeout(loop, 100);

        setValues();

    };
	
	loop();

});
