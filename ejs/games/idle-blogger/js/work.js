// a work module for the player module
// It depends on Level

app.factory('work', function (Level) {

    var work = {

        // new game method will define all properties used to starting values
        newGame: function () {

            this.money = 0;

            this.workRate = .01; // the about of money made when clicking the work button
            this.workCompleteTime = 500; // the amount of time it takes to complete a job
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

    work.newGame();

    return work;

});
