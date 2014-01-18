describe('VideoController', function() {
    var $scope;

    beforeEach(module('explorerApp'));

    beforeEach(inject(function($rootScope, $controller) {
        $scope = $rootScope.$new();
        $controller('VideoController', {$scope: $scope});
    }));

    it('should have initial video list', function() {
        expect($scope.videos).toBe("The list of available videos...");
    });
});