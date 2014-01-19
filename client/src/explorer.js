var app = angular.module('explorerApp', ['ngRoute']);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'client/views/video_list.html',
                controller: 'VideoController'
            }).
            when('/details', {
                templateUrl: 'client/views/video_details.html',
                controller: 'VideoDetailsController'
            }).otherwise({
                redirectTo: '/'
            });
    }
]).config(['$sceDelegateProvider', function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'http://static.everyplay.com/**']);
}]);

app.factory('GameVideoService', ['$http', function($http) {
    return {
        get: function(path, callback) {
            $http({method: 'GET', url: path}).success(
                function(data, status, headers, config) {
                    callback(data);
                }
            ).error(
                function(data, status, headers, config) {
                    console.error(data);
                }
            );
        }
    };
}]);

app.controller("VideoController", ['$location', '$rootScope', '$scope', 'GameVideoService',
        function($location, $rootScope, $scope, gameVideoService) {

    function retrieveVideos(gameId) {
        var path = (gameId >= 0) ? "/videos?gameId=" + gameId : "/videos";

        $rootScope.isLoading = true;
        gameVideoService.get(path, function(videos) {
            $scope.videos = videos;
            $rootScope.isLoading = false;
        });
    }

    function retrieveGames() {
        $rootScope.isLoading = true;
        gameVideoService.get("/games", function(games) {
            $scope.games = games;
            $rootScope.isLoading = false;
        });
    }

    $scope.videos = [];
    $scope.games = [];
    $scope.gameId = -1;
    $rootScope.isLoading = false;

    retrieveGames();

    $scope.$watch('gameId', function(value) {
        retrieveVideos(parseInt(value));
    });

    $scope.openDetails = function(video) {
        $rootScope.selectedVideo = video;
        $location.path("/details");
    };
}]);

app.controller('VideoDetailsController', ['$scope', '$rootScope', function($scope, $rootScope) {
    $rootScope.$watch("selectedVideo", function(video) {
        $scope.video = video;
    });
}]);