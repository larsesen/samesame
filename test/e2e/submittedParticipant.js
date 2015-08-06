var util = require("./utilities");

describe('submittedParticipant.js, adding new participant to database table:', function() {
  
  var timestamp = (new Date).getTime();

  it("should verify that the participant table is truncated", function(){
  	util.directToIndex(browser);
    util.clickSeeAllParticipants(browser);
    util.deleteParticipants(browser);

    //Checks that no elements with binding exist --> There are no entries in the answers table
  	expect(element(by.binding('participant.email')).isPresent()).toBe(false);
  });


  it("should add a new answer", function() {
    util.directToIndex(browser);
    util.clickToAnswerPage(browser);
    util.fillAnswerRandomly(browser);
    util.clickProceedButton(browser);
  });


  it('should register participant', function() {
    util.registerParticipant(browser, timestamp);
    util.submitParticipant(browser);
  });


  it("should verify new participant in participant table", function(){
  	util.directToViewParticipants(browser);
  	expect(element(by.binding('participant.email')).isPresent()).toBe(true);
  }); 

});