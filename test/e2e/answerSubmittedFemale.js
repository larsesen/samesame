var util = require("./utilities");

xdescribe('answerSubmittedFemale.js, adding new female answer to stats table:', function() {
  

  it("should verify that answer table is truncated", function(){
    util.directToIndex(browser);
    util.clickSeeAllAnswers(browser);
    util.deleteAnswers(browser);

    //Checks that no elements with binding exist --> There are no entries in the answers table
  	expect(element(by.binding('answer.userid')).isPresent()).toBe(false);
  });




  it("should add a new answer", function() {
    util.directToIndex(browser);
    util.clickToAnswerPage(browser);
    util.fillAnswerFemale(browser);
  });


  it("should verify new answer in answer table", function(){	
    util.directToViewAnswers(browser);
  	expect(element(by.binding('answer.userid')).isPresent()).toBe(true);
  }); 

});