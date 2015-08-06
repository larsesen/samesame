var util = require("./utilities");

describe('verifyTitles.js, test title of pages:', function() {
  
    var timestamp = (new Date).getTime();
    var correctTitle = "Same same, but different";

  it('should confirm correct title on all pages', function() {
    
    util.directToIndex(browser);
    expect(browser.getTitle()).toEqual(correctTitle);

    util.clickSeeAllAnswers(browser);
    expect(browser.getTitle()).toEqual(correctTitle)
  
    util.clickMenuButton(browser);
    util.clickRegisterAnswerButton(browser);
    expect(browser.getTitle()).toEqual(correctTitle)

    util.clickStartButton(browser);
    expect(browser.getTitle()).toEqual(correctTitle)

    util.fillAnswerRandomly(browser);
    util.clickProceedButton(browser);
    expect(browser.getTitle()).toEqual(correctTitle)

    util.registerParticipant(browser, timestamp);
    util.submitParticipant(browser);
    expect(browser.getTitle()).toEqual(correctTitle)
  });

});
