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
        posts: [], // and array of objects that have to do with posts of a certain level

        tick: function () {

            // this.money += this.postCT * 0.01;
            this.money = this.money.toFixed(2) * 1;

        },

        write: function () {

            var postTier = Math.ceil(Math.random() * this.level),
            tier = this.posts[postTier];

            if (tier) {

                tier += 1;

            } else {

                tier = {

                    postTier: postTier,
                    count: 0

                };

            }

            this.postCT += 1;

            this.level.setByExp(this.postCT);

        }

    };

});
