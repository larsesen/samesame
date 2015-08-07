var util = require("./utilities");

describe('redirecting.js, test redirection and Urls:', function() {
  
  var baseURL = "http://localhost:3000/public/";

  it('should redirect page to correct Url when navigating', function() {
    
  	//Does not register participant, but verifies all other links

    util.directToIndex(browser);
   	expect(browser.getCurrentUrl()).toEqual(baseURL + "index.html#/partial-index");

    util.directToPublic(browser);
   	expect(browser.getCurrentUrl()).toEqual(baseURL + "#/partial-index");

    util.clickSeeAllAnswers(browser);
   	expect(browser.getCurrentUrl()).toEqual(baseURL + "#/partial-view-answers");

 	  util.clickMenuButton(browser);
   	expect(browser.getCurrentUrl()).toEqual(baseURL + "#/partial-index");

   	util.clickSeeAllParticipants(browser);
   	expect(browser.getCurrentUrl()).toEqual(baseURL + "#/partial-view-participants");

    util.clickMenuButton(browser);
    expect(browser.getCurrentUrl()).toEqual(baseURL + "#/partial-index");

    util.clickRegisterAnswerButton(browser);
    expect(browser.getCurrentUrl()).toEqual(baseURL + "#/partial-start");

    util.clickStartButton(browser);
    expect(browser.getCurrentUrl()).toEqual(baseURL + "#/partial-register-answer");

    util.fillAnswerRandomly(browser); 
    expect(browser.getCurrentUrl()).toEqual(baseURL + "#/partial-view-results")  

    util.clickProceedButton(browser); 
   	expect(browser.getCurrentUrl()).toEqual(baseURL + "#/partial-register-participant");   	

   	util.clickEscapeButton(browser);
   	expect(browser.getCurrentUrl()).toEqual(baseURL + "#/partial-start");  

    util.directToIndex(browser);
    expect(browser.getCurrentUrl()).toEqual(baseURL + "index.html#/partial-index");

    util.directToIndex(browser);
    expect(browser.getCurrentUrl()).toEqual(baseURL + "index.html#/partial-index");

    /*
    Statistics module
    */

    util.clickStatistics(browser);
    expect(browser.getCurrentUrl()).toEqual(baseURL + "index.html#/partial-stat-overview");

    util.clickTableStatistics(browser);
    expect(browser.getCurrentUrl()).toEqual(baseURL + "index.html#/partial-stat-table");

    util.clickStatisticMenuButton(browser);
    expect(browser.getCurrentUrl()).toEqual(baseURL + "index.html#/partial-stat-overview");

/*
Complete when statistic module is built with final names

    util.clickStatisticMenuButton(browser);
    expect(browser.getCurrentUrl()).toEqual(baseURL + "index.html#/partial-stat-overview");

    util.clickComparisonStatistics(browser);
    expect(browser.getCurrentUrl()).toEqual(baseURL + "index.html#/partial-stat-Comparison");
*/
    util.clickTypeStatistics(browser);
    expect(browser.getCurrentUrl()).toEqual(baseURL + "index.html#/partial-stat-typePerson");


	});

});