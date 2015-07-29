var util = require("./utilities");

describe('happy flow of application:', function() {

    var baseURL = "http://localhost:3000";
    var timestamp = (new Date).getTime();
  
  it('should click through application with random entries', function() {
        util.directToIndex(browser);
        util.clickToAnswerPage(browser);
        util.fillAnswerRandomly(browser);
        expect(browser.getCurrentUrl()).toEqual(baseURL + "/public/index.html#/partial-register-participant");
    });


  it('should register participant', function() {
        util.registerParticipant(browser, timestamp);
        util.submitParticipant(browser);
        expect(browser.getCurrentUrl()).toEqual(baseURL + "/public/index.html#/partial-participant-registered");
            });
    
});