describe('VideoController', function() {
    var scope = null,
        videos = [];

    beforeEach(module('explorerApp'));

    function instantiateVideoController() {
        inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            $controller('VideoController', {$scope: scope, 
                GameVideoService: {
                    getAllVideos: function(callback) {
                        callback(videos);
                    }
                }
            });
        });
    }

    it('has empty initial video list', function() {
        videos = [];
        instantiateVideoController();
        expect(scope.videos).toEqual([]);
    });

    it('fetches video list from GameVideoService', function() {
        videos = ["video1", "video2", "video3"];
        instantiateVideoController();
        expect(scope.videos).toEqual(["video1", "video2", "video3"]);
    });
});