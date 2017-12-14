# Templates ng-repeat demo

The ng-repeat directive tells angular to use the given element as a template. I just then need to define a controller that provides a scope value to use and bam!

## HTML

```html
<ul ng-app="enemyMod" ng-controller="EnemyList">
    <li ng-repeat="e in enemys">
        <h3>Desc: {{e.desc}}</h3>
        <p>Attack: {{e.attack}}</p>
        <p>Defence: {{e.defence}}</p>
    </li>
</ul>
```

## JS

```js
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

```
