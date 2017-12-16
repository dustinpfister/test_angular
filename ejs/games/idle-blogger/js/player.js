app.factory('player', function (work, posts) {

    return {

        money: 0,

        tick: function () {

            work.tick();

            this.money = work.money + posts.money;

            this.money = this.money.toFixed(2) * 1;

        },

        doWork: work.doWork

    };

});
