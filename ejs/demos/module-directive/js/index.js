var app = angular.module('app', []);

// basic directive example.
app.directive('firstDirective', function () {

    return {

        restrict: 'AE',
        replace: 'true',
        template: '<p>My own directive</p>'

    };

});

// use the $scope of a parent controller.
app.directive('useController', function () {

    return {

        restrict: 'AE',
        replace: 'true',
        template: '<p>{{mess}}</p>'

    };

});

app.controller('the-controller', function ($scope) {

    $scope.mess = 'uisng the controller';

});

app.directive('addScope', function () {

    return {

        restrict: 'AE',
        replace: 'true',
        template: '<p>{{mess}}</p>',
        link: function (scope, el, att) {

            if (!scope.mess) {

                scope.mess = 'this is some local stuff.';

            }
        }

    };

});

app.directive('many', function () {

    return {

        restrict: 'AE',
        replace: 'true',
        template: '<div><p>{{p.mess}}</p></div>',
        compile: function (el, att) {

            console.log('complie');
            return this.link;

        },
        link: function (scope, el, att) {

            console.log('link');

            if (!scope.p) {

                scope.p = {mess:'single use'};

            }

        }

    };

});

app.controller('manyControl', function ($scope) {
    $scope.obj = [{
            mess: 'one'
        }, {
            mess: 'two'
        }, {
            mess: 'three'
        }
    ];
});

/*
app.controller('manyControl', function ($scope) {

$scope.obj = [{

mess: 'one'

}, {

mess: 'two'

}, {

mess: 'three'

}
];

});
 */

/*
app.directive('useTemp', function () {

return {

restrict: 'AE',
replace: 'true',
templateUrl: 'temp.html'

};

});
*/
