var app = angular.module('enemyMod', []);

app.controller('EnemyList', function ($scope) {
    $scope.enemys = [
        {
            desc: 'Goblin',
            attack: 3,
            defence: 1
        }, {
            desc: 'Org',
            attack: 7,
            defence: 5
        }, {
            desc: 'Org boss',
            attack: 10,
            defence: 6
        }
    ];
});
