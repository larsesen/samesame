var util = require("./utilities");

describe('answer database:', function() {
  
  it('should delete answers in table', function() {
    
    util.directToIndex(browser);
    util.clickSeeAllAnswers(browser);

    util.deleteAnswers(browser);

    //Checks that no elements with binding exist --> There are no entries in the answers table
  	expect(element(by.binding('answer.userid')).isPresent()).toBe(false);	
	});

});