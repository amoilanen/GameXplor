describe('GameXplor', function() {

  it('should show list of videos on first page', function() {
    browser().navigateTo('/index.html');
    expect(element('.ng-binding').text()).toEqual("The list of available videos...");
  });
});