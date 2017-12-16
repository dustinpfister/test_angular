
app.factory('posts', function (Level) {

    return {

        money: 0,

        posts: 0,

        tick: function () {

            this.money += this.posts * 0.01;
			this.money = this.money.toFixed(2) * 1;

        },

        write: function () {

            this.posts += 1;

        }

    };

});
