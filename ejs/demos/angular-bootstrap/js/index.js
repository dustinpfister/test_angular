angular.module('one', []).controller('control', function($scope) {
       $scope.mess = 'I am app one';
});

angular.module('two', []).controller('control', function($scope) {
       $scope.mess = 'I am app two';
});

angular.bootstrap(document.getElementById('two'),['two']);
