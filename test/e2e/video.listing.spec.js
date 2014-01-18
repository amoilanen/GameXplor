describe('GameXplor', function() {

  it('should load the first page', function() {
      browser().navigateTo('/index.html');
      expect(element('h1').text()).toEqual("Game Videos");
  });

  it('should show list of videos and populate game filter on the first page', function() {
      browser().navigateTo('/index.html');

      sleep(3);

      //i.e. there are options other than "All games"
      expect(repeater('.filter-select .filter-option').count()).toBeGreaterThan(1);
      expect(repeater('div.video-preview').count()).toEqual(5);
  });
});