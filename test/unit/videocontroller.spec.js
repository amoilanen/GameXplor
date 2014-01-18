describe('VideoController', function() {
    var scope = null,
        videos = [];

    beforeEach(module('explorerApp'));

    function instantiateController() {
        inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            $controller('VideoController', {$scope: scope, 
                GameVideoService: {
                    get: function(path, callback) {
                        if (videos.length > 0) {
                            callback(videos);
                        }
                    }
                }
            });
        });
    }

    it('has empty initial video list', function() {
        videos = [];
        instantiateController();
        expect(scope.videos).toEqual([]);
    });

    it('fetches video list from GameVideoService', function() {
        videos = ["video1", "video2", "video3"];
        instantiateController();
        expect(scope.videos).toEqual(videos);
    });
});