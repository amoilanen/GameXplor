describe('VideoController', function() {
    var games = [],
        videos = [];

    beforeEach(module('explorerApp'));

    function instantiateController(callback) {
        inject(function($rootScope, $controller) {
            var scope = $rootScope.$new();

            $controller('VideoController', {$scope: scope, 
                GameVideoService: {
                    get: function(path, callback) {
                        if (path == "/videos") {
                            if (videos.length > 0) {
                                callback(videos);
                            }
                        } else if (path = "/games") {
                            if (games.length > 0) {
                                callback(games);
                            }
                        }
                    }
                }
            });
            scope.$apply();
            callback && callback(scope);
        });
    }

    it('has empty initial video list', function() {
        videos = [];
        instantiateController(function(scope) {
            expect(scope.videos).toEqual([]);
        });
    });

    it('fetches video list from GameVideoService', function() {
        videos = ["video1", "video2", "video3"];
        instantiateController(function(scope) {
            expect(scope.videos).toEqual(videos);
        });
    });

    it('has empty initial game list', function() {
        games = [];
        instantiateController(function(scope) {
            expect(scope.games).toEqual(games);
        });
    });

    it('fetches game list from GameVideoService', function() {
        games = ["game1", "game2", "game3"];
        instantiateController(function(scope) {
            expect(scope.games).toEqual(games);
        });
    });
});