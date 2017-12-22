var app = angular.module('app', []);


app.controller('control', function($scope){

    $scope.foo = function(){

        alert('bar');

    };

});


// the taction
app.directive('theDirective', function ($timeout) {

    return {

        scope:{
            func : '&'
        },
        template: '<input type=\"button\" ng-click="func()" value=\"alert bar\">',


    }

});
