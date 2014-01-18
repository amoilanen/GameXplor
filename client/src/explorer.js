var app = angular.module('explorerApp', []);

app.controller("VideoController", ['$scope', function($scope) {
    $scope.videos = "The list of available videos...";
}]);