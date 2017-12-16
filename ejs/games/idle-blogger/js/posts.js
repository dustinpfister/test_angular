/*

Posts.js

This is a angular module for the game idle-blogger that has to do with the storage, and manipulation of blog posts.

 */
app.factory('posts', function (Level) {

    return {

        money: 0,

        level: new Level({
            cap: 3,
            pow: 1.25,
            inc: 5
        }),

        postCT: 0,
        tiers: [], // and array of objects that have to do with posts of a certain level


        tickLast: new Date(),
        tickRate: 5000,
        tickTime: 0,

        tick: function () {

            var self = this;

            this.tickTime = new Date() - this.tickLast;

            if (this.tickTime > this.tickRate) {
                this.tickTime = this.tickRate;
            }

            if (this.tickTime === this.tickRate) {

                this.tiers.forEach(function (tier) {

                    self.money += tier.rate * tier.count;

                });

                this.tickLast = new Date();
                this.tickTime = 0;

            }

            // this.money += this.postCT * 0.01;
            this.money = this.money.toFixed(2) * 1;

        },

        write: function () {

            var i = Math.floor(Math.random() * this.level.level);

            if (this.tiers[i]) {

                //tier += 1;
                this.tiers[i].count += 1;

            } else {

                this.tiers[i] = {

                    postTier: i + 1,
                    count: 1,
                    rate: 0.01 * (i + 1)

                };

            }

            this.postCT += 1;

            this.level.setByExp(this.postCT);

        }

    };

});
