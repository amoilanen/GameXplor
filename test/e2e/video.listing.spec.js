describe('GameXplor', function() {

  it('should load the first page', function() {
      browser().navigateTo('/index.html');
      expect(element('h1').text()).toEqual("Game Videos");
  });

  it('should show list of videos on first page', function() {
      browser().navigateTo('/index.html');

      //Sleep for 5 seconds
      sleep(3);

      expect(repeater('div.video-preview').count()).toEqual(5);
  });
});