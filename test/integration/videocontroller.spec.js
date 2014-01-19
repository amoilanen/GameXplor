describe('VideoController', function() {

    var videos = [
            ["video1", "video2", "video3"],
            ["video4", "video5", "video6"],
            ["video7", "video8", "video9"]
        ],
        games = [
            ["game1", "game2", "game3"],
            ["game4", "game5", "game6"],
            ["game7", "game8", "game9"]
        ],
        gameId = 120;

    beforeEach(module('explorerApp'));

    function instantiateController(callback) {
        inject(function($rootScope, $controller, $httpBackend) {
            var $scope = $rootScope.$new();

            $httpBackend.expect('GET', '/games')
                .respond(200, JSON.stringify(games[0]));
            $httpBackend.expect('GET', '/videos')
                .respond(200, JSON.stringify(videos[0]));

            $controller("VideoController", {$scope: $scope});

            $httpBackend.flush();
            expect($scope.videos).toEqual(videos[0]);
            expect($scope.games).toEqual(games[0]);

            callback && callback($scope, $httpBackend);
        });
    }

    it('queries for all videos initially', function() {
        instantiateController();
    });

    it('queries for videos of a specific game when that game is selected', function() {
        instantiateController(function($scope, $httpBackend) {
            $httpBackend.expect('GET', '/videos?gameId=' + gameId)
                .respond(200, JSON.stringify(videos[1]));

            $scope.gameId = gameId;

            $httpBackend.flush();
            expect($scope.videos).toEqual(videos[1]);
            expect($scope.games).toEqual(games[0]);
        });
    });

    it('queries for all videos when no game is selected after a selected game', function() {
        instantiateController(function($scope, $httpBackend) {
            $httpBackend.expect('GET', '/videos?gameId=' + gameId)
                .respond(200, JSON.stringify(videos[1]));

            $scope.gameId = gameId;

            $httpBackend.flush();
            expect($scope.videos).toEqual(videos[1]);
            expect($scope.games).toEqual(games[0]);

            $scope.gameId = -1;

            $httpBackend.expect('GET', '/videos')
                .respond(200, JSON.stringify(videos[2]));

            $httpBackend.flush();
            expect($scope.videos).toEqual(videos[2]);
            expect($scope.games).toEqual(games[0]);
        });
    });
});