var util = require("./utilities");

xdescribe('test title of pages:', function() {
  
    var timestamp = (new Date).getTime();
    var correctTitle = "Same same, but different";

  xit('should confirm correct title on all pages', function() {
    
    util.directToIndex(browser);
    expect(browser.getTitle()).toEqual(correctTitle);

    util.seeAllAnswers(browser);
    expect(browser.getTitle()).toEqual(correctTitle)
  
    util.clickMenuButton(browser);
    util.clickRegisterAnswerButton(browser);
    expect(browser.getTitle()).toEqual(correctTitle)

    util.clickStartButton(browser);
    expect(browser.getTitle()).toEqual(correctTitle)

    util.fillAnswer(browser);
    util.submitAnswers(browser);
    expect(browser.getTitle()).toEqual(correctTitle)

    util.registerParticipant(browser, timestamp);
    util.submitParticipant(browser);
    expect(browser.getTitle()).toEqual(correctTitle)
  });

});
