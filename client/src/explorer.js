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
                    //TODO: Handle the error
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

        gameVideoService.get(path, function(videos) {
            $scope.videos = videos;
        });
    }

    function retrieveGames() {
        gameVideoService.get("/games", function(games) {
            $scope.games = games;
        });
    }

    $scope.videos = [];
    $scope.games = [];
    $scope.gameId = -1;

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
    $scope.video = {"camera_corner":"BottomRight","preview_thumbnail":"http://static.everyplay.com/everyplay/videos/raw/13035458527880.09966901DEC7-B905-416C-A3C6-7AB5B54C5E94thumb.jpg","session_id":"6901DEC7-B905-416C-A3C6-7AB5B54C5E94","updated_at":"2014-01-14T11:37:50.439Z","legend":"","copied_from_user_id":0,"copied_from_video_id":0,"copied_to":0,"encoding_job_id":"73377257","comment_count":196,"not_listed":false,"hidden":false,"tag_list":"","share_count":45,"width":1136,"height":640,"duration":651918,"user_id":5470791,"moderation_flag":"","title":"6171m @the Beach","status":"finished","permalink":"6171m-the-beach","thumbnail_url":"http://static.everyplay.com/everyplay/videos/5470791/2340293/thumbnail.jpg","video_url":"http://static.everyplay.com/everyplay/videos/raw/11945992877033.99686901DEC7-B905-416C-A3C6-7AB5B54C5E94screen.mp4","base_url":"http://static.everyplay.com/everyplay/videos/5470791/2340293/","views":6238,"content_rating":9,"likes_count":738,"game_id":162,"created_at":"2014-01-14T11:28:25.251Z","id":2340293,"camera_crop":true,"device_type":"iPhone5,2","shared_to_count":45,"game":{"id":162,"name":"Hill Climb Racing","profile_id":7347,"user_id":7346,"external_id":"564540143","has_external_url":true,"external_url":"https://everyplay.com/api/games/162/store","show_appstore_button":true,"play_id":"","requires_moderation":false,"force_private":false,"content_rating":9,"sdk_version":1710,"sandbox_sdk_version":1711,"kind":"game","profile":{"id":7347,"admin":false,"username":"Hill Climb Racing","permalink":"hill-climb-racing","cover_url":"https://static.everyplay.com/everyplay/covers/large/cover-hcr.jpg","cover_url_small":"https://www.everyplay.com/assets/img/icon-default-cover.jpeg","avatar_url":"https://static.everyplay.com/everyplay/avatars/large/2568783091817.56-7347.jpg","avatar_url_small":"https://static.everyplay.com/everyplay/avatars/small/2568783091817.56-7347.jpg"},"owner":{"id":7346,"admin":false,"username":"thyrene","permalink":"thyrene","cover_url":"https://www.everyplay.com/assets/img/icon-default-cover.jpeg","cover_url_small":"https://www.everyplay.com/assets/img/icon-default-cover.jpeg","avatar_url":"https://www.everyplay.com/assets/img/icon-default-avatar.png","avatar_url_small":"https://www.everyplay.com/assets/img/icon-default-avatar-small.png"}},"user":{"id":5470791,"admin":false,"username":"Player5470791","permalink":"player5470791","cover_url":"https://www.everyplay.com/assets/img/icon-default-cover.jpeg","cover_url_small":"https://www.everyplay.com/assets/img/icon-default-cover.jpeg","avatar_url":"https://www.everyplay.com/assets/img/icon-default-avatar.png","avatar_url_small":"https://www.everyplay.com/assets/img/icon-default-avatar-small.png"},"video_files":{"high":"m31-1500.mp4","medium":"m31-1000.mp4","low":"b30-600.mp4","hls":"playlist.m3u8"},"thumbnail_files":{"high":"thumbnail_big.jpg","medium":"thumbnail_medium.jpg","low":"thumbnail.jpg"},"kind":"video"};

    console.log($scope.video);

    $rootScope.$watch("selectedVideo", function(video) {
        $scope.video = video;
    });
}]);