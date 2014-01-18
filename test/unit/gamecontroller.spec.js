describe('GameController', function() {
    var scope = null,
        games = [];

    beforeEach(module('explorerApp'));

    function instantiateController() {
        inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            $controller('GameController', {$scope: scope, 
                GameVideoService: {
                    get: function(path, callback) {
                        if (games.length > 0) {
                            callback(games);
                        }
                    }
                }
            });
        });
    }

    it('has empty initial game list', function() {
        games = [];
        instantiateController();
        expect(scope.games).toEqual(games);
    });

    it('fetches game list from GameVideoService', function() {
        games = ["game1", "game2", "game3"];
        instantiateController();
        expect(scope.games).toEqual(games);
    });
});