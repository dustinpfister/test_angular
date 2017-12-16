/*

Posts.js

This is a angular module for the game idle-blogger that has to do with the storage, and manipulation of blog posts.

 */
app.factory('posts', function (Level) {

    return {

        money: 0,

        level: new Level({
            cap: 10,
            pow: 1.25,
            inc: 5
        }),

        postCT: 0,
        tiers: [], // and array of objects that have to do with posts of a certain level

        tick: function () {

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

                    postTier: i+1,
                    count: 0

                };

            }

            this.postCT += 1;

            this.level.setByExp(this.postCT);

        }

    };

});
