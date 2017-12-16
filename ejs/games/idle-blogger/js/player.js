app.factory('player', function (work) {

    return {

        money: 0,

        tick: function () {

            work.tick();

            this.money = work.money;

        },

        doWork: work.doWork

    };

});
