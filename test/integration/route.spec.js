describe('Configured Routes', function() {

    beforeEach(module('explorerApp'));

    it('has all the defined routes', function() {
        inject(function($route) {
            expect($route.routes['/'].controller).toBe('VideoController');
            expect($route.routes['/'].templateUrl).toEqual('client/views/video_list.html');
            expect($route.routes['/details'].controller).toBe('VideoDetailsController');
            expect($route.routes['/details'].templateUrl).toEqual('client/views/video_details.html');
        });
    });

});