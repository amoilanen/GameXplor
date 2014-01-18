describe('VideoController', function() {

    var videos = ["video1", "video2", "video3"],
        games = ["game1", "game2", "game3"],
        gameId = 120;

    beforeEach(module('explorerApp'));

    function instantiateController(callback) {
        inject(function($rootScope, $controller, $httpBackend) {
            var scope = $rootScope.$new();

            $httpBackend.expect('GET', '/games')
                .respond(200, JSON.stringify(games));
            $httpBackend.expect('GET', '/videos')
                .respond(200, JSON.stringify(videos));

            $controller("VideoController", {$scope: scope});

            $httpBackend.flush();

            callback && callback(scope, $httpBackend);
        });
    }

    it('queries for all videos initially', function() {
        instantiateController();
    });

    it('queries for videos of a specific game when that game is selected', function() {
        instantiateController(function(scope, $httpBackend) {
            $httpBackend.expect('GET', '/videos?gameId=' + gameId)
                .respond(200, JSON.stringify(videos));

            scope.gameId = gameId;

            $httpBackend.flush();
        });
    });

    it('queries for all videos when no game is selected after a selected game', function() {
        instantiateController(function(scope, $httpBackend) {
            $httpBackend.expect('GET', '/videos?gameId=' + gameId)
                .respond(200, JSON.stringify(videos));

            scope.gameId = gameId;

            $httpBackend.flush();

            scope.gameId = -1;

            $httpBackend.expect('GET', '/videos')
                .respond(200, JSON.stringify(videos));

            $httpBackend.flush();
        });
    });
});