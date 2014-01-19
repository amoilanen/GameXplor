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
      expect(repeater('div.video-preview').count()).toEqual(10);
  });

  it('opens a details window when a thumbnail is clicked', function() {
      var firstThumbnailElement = null,
          firstVideoTitle = null;

      browser().navigateTo('/index.html');

      sleep(3);

      firstThumbnailElement = element('div.video-preview:first-child img.preview-thumbnail');

      /*
       * text() returns a Promise
       * Using the approach suggested in https://groups.google.com/forum/#!msg/angular/aPQMJhPhQpI/t74jF2BJ0bIJ
       */
      element('div.video-preview:first-child div.preview-title').query(function (selectedElements, done) {
          firstVideoTitle = selectedElements.text(); //JQuery's "text" method

          firstThumbnailElement.click();

          sleep(2);

          expect(browser().location().url()).toBe('/details');
          expect(element('div.video-details-title').text()).toEqual(firstVideoTitle);
          expect(element('source').attr('type')).toEqual('video/mp4');

          done();
      });
  });
});