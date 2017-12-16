## Money

This is the first game for my test_angular project. It is a simple incremental game, that makes use of controllers, and a shared object between them made with angular.factory.


## The Work Button

Click the work button to "do work" to which you get payed a small about of money each time. The money will not be payed out until the work is done, so there is a working time displayed. 

In this game you just keep clicking work until you get board of playing, as this is just an exercise that may lead to something better.

## My Level Module

I wrote a separate vanilla js module for handling leveling up.

The level module allows for me to to define a level cap, as well as other values that define how leveling will happen.

```js
var Level = function (options) {
 
    options = options || {};
 
    this.cap = options.cap || 100;
    this.pow = options.pow || 2;
    this.inc = options.inc || 10;
 
    this.exp = 0;
    this.level = 1;
 
    // set exp by given level if a level is given
    if (options.level) {
 
        this.level = options.level;
        this.exp = this.expForLevel(this.level);
 
    }
 
    // always override level with any given exp
    // becuase that is what is typical
    if (options.exp) {
 
        this.exp = options.exp;
        this.level = this.levelForExp(this.exp);
 
    }
 
};
 
// get the given exp for the given level
Level.prototype.expForLevel = function (level) {
 
    if (level <= 1) {
 
        return 0;
 
    }
 
    if (level > this.cap) {
 
        level = this.cap;
 
    }
 
    return Math.pow(this.pow, level - 1) + this.inc * (level - 1);
 
};
 
// get the level for the given exp
Level.prototype.levelForExp = function (exp) {
 
    var level = this.cap;
    while (level > 1) {
 
        if (exp >= this.expForLevel(level)) {
 
            return level;
 
        }
 
        level -= 1;
 
    }
 
    return level;
 
};
 
Level.prototype.remainingExp = function () {
 
    var nextLevel = this.level + 1;
 
    if (nextLevel > this.cap) {
 
        return 0;
 
    }
 
    return this.expForLevel(nextLevel) - this.exp;
 
};
 
Level.prototype.setByExp = function (exp) {
 
    this.exp = exp;
    this.level = this.levelForExp(exp);
 
    if (this.level === this.cap) {
 
        this.exp = this.expForLevel(this.cap);
 
    }
 
    this.remaining = this.remainingExp();
 
};
```

This provides a bunch of methods for handling leveling up, including finding the current level if you know exp, and versa.

Leveling is one of the many creative, and fun aspects of game development.

## The angular module

```js
var app = angular.module('app', []);
 
app.factory('player', function () {
 
    var player = {
 
        // new game method will define all properties used to starting values
        newGame: function () {
 
            this.money = 0;
 
            this.workRate = .01; // the about of money made when clicking the work button
            this.workCompleteTime = 5000; // the amount of time it takes to complete a job
            this.working = false; // is the player currently working?
            this.workingStart = false; // is the player starting to work?
            this.workingStartTime = new Date; // the time the player started working
            this.workingTime = 0; // the amount of time in ms the player has worked so far
            this.workCount = 0;
 
            this.tickLast = new Date();
            this.tickBaseRate = 1000;
            this.tickRate = 10;
            this.tickMS = this.tickBaseRate / this.tickRate;
 
            // use level class
            this.level = new Level();
 
        },
 
        // what to do on each tick of a game loop
        tick: function (done) {
 
            var now = new Date();
 
            done = done || function () {}
 
            if (now - this.tickLast >= this.tickMS) {
 
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
 
                        this.levelUp();
 
                    }
 
                }
 
                // done with what needs to be done for player.tick
                done();
 
            }
 
        },
 
        levelUp: function () {
 
            this.level.setByExp(this.workCount);
            this.workRate = .01 * this.level.level;
 
        },
 
        // the work button was clicked
        doWork: function () {
 
            if (!this.workingStart && !this.working) {
 
                this.workingStart = true;
 
            }
 
        }
 
    };
 
    player.newGame();
 
    return player;
 
});
 
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
```