var util = require("./utilities");

xdescribe('register participant:', function() {
  
  var timestamp = (new Date).getTime();

  xit('should hide "register" button when form is not valid', function() {    
    util.directToIndex(browser);
    util.clickRegisterAnswerButton(browser);
    util.clickStartButton(browser);

    util.fillAnswer(browser);
    util.submitAnswers(browser);

    //Verifies that button can't be pressed when form is not valid
    expect(element(by.name('submitButton')).getAttribute('disabled')).toBeTruthy();
  });


  xit('should show "register" button when form is valid', function() {
    util.registerParticipant(browser, timestamp);
    
    expect(element(by.name('submitButton')).getAttribute('disabled')).toBeFalsy();
  });


});