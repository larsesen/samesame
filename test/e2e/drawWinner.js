var util = require("./utilities");

describe('testing draw winner functionality within participants:', function() {

  var timestamp = (new Date).getTime();

  it("should draw winner from participant table", function(){

    util.directToIndex(browser);
   
    //Deleting all entries in participants table
    util.clickSeeAllParticipants(browser);
    util.deleteParticipants(browser);

    util.clickMenuButton(browser);
    util.clickToAnswerPage(browser);

    util.fillAnswerRandomly(browser);
  
    util.registerParticipant(browser, timestamp);
    util.submitParticipant(browser);


  	util.directToViewParticipants(browser);

  	expect(element(by.binding("winner.email")).isPresent()).toBe(false);
    util.pickWinner(browser);
    expect(element(by.binding("winner.email")).isPresent()).toBe(true);
  }); 

});

