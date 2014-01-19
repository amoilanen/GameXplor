describe('VideoDetailsController', function() {
    var games = [],
        videos = [];

    beforeEach(module('explorerApp'));

    function instantiateController(callback) {
        inject(function($rootScope, $controller) {
            var scope = $rootScope.$new();

            $controller('VideoDetailsController', {$scope: scope});
            scope.$apply();
            callback && callback(scope, $rootScope);
        });
    }

    it('updates the video when selectedVideo changes in root scope', function() {
        videos = [];
        instantiateController(function($scope, $rootScope) {
            $scope.video = "oldSelectedVideo";
            $rootScope.selectedVideo = "selectedVideo";
            $rootScope.$apply();

            expect($scope.video).toEqual("selectedVideo");
        });
    });
});