app.factory('player', function (work) {

    return {

        money: 0,

        tick: function () {

            work.tick();

            money = work.money;

        },

        doWork: work.doWork

    };

});
