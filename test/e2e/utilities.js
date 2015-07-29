
var milliseconds = (new Date).getTime();

var responses = ["a", "b"];
var prize = ["participantPrizeA", "participantPrizeB"];
var numberOfQuestions = 8;

/********************************
URLs
********************************/

function directToIndex(browser) {
    browser.get('/');
}

function directToViewAnswers(browser) {
    browser.get("/#/partial-view-answers");
}

function directToViewParticipants(browser) {
    browser.get("/public/#/partial-view-participants");
}

function directToPublic(browser) {
    browser.get('/public');
}




/*******************************
Click on buttons
*******************************/


function clickToAnswerPage(browser) {
    clickRegisterAnswerButton(browser);
    clickStartButton(browser);
}

function clickRegisterAnswerButton(browser) {
    browser.findElement(by.name("registerAnswer")).click();
}

function clickStartButton(browser) {
    browser.findElement(by.name("startButton")).click();
}

function clickSeeAllAnswers(browser) {
    browser.findElement(by.name("seeAllAnswers")).click();
}


function clickSeeAllParticipants(browser) {
    browser.findElement(by.name("seeAllParticipants")).click();
}

function clickMenuButton(browser) {
    browser.findElement(by.name("menuButton")).click();
}

function clickStatistics(browser) {
    browser.findElement(by.name("seeStatistics")).click();
}

function clickTableStatistics(browser) {
    browser.findElement(by.name("seeTableStatistics")).click();
}

function clickComparisonStatistics(browser) {
    browser.findElement(by.name("seeComparisonStatistics")).click();
}

function clickAverageStatistics(browser) {
    browser.findElement(by.name("seeAverageStatistics")).click();
}

function clickStatisticMenuButton(browser) {
    browser.findElement(by.name("statisticMenuButton")).click();
}

function clickEscapeButton(browser) {
    browser.findElement(by.name("escapeButton")).click();
}



/*******************************
Functions
*******************************/



function pickWinner(browser) {
    browser.findElement(by.name("pickWinner")).click();
}

function deleteAnswers(browser) {
    browser.findElement(by.name("deleteAnswers")).click();
    browser.findElement(by.name("confirmDelete")).click();
}


function deleteParticipants(browser) {
    browser.findElement(by.name("deleteParticipants")).click();
    browser.findElement(by.name("confirmDelete")).click();
}


function registerParticipant(browser, timestamp) {
    browser.findElement(By.name("participantName")).sendKeys("test");
    browser.findElement(By.name("participantEmail")).sendKeys("test" + timestamp +"@testing.no");
    browser.findElement(By.name(getRandomWithinLength(prize))).click();
}

function submitParticipant(browser) {
    browser.findElement(By.name("submitButton")).click();
}

function fillAnswerRandomly(browser) {
    var i;
    for (i = 0; i < numberOfQuestions; i++) {
        browser.findElement(by.name(getRandomWithinLength(responses))).click();
    }
 }

//Following two functions chooses sex with first question, then randomly generates remaining answers.
function fillAnswerMale(browser) {
    browser.findElement(by.name("a")).click();
    var i;
    for (i = 0 ; i < numberOfQuestions -1 ; i++) {
        browser.findElement(by.name(getRandomWithinLength(responses))).click();
    }
}

function fillAnswerFemale(browser) {
    browser.findElement(by.name("b")).click();
    var i;
    for (i = 0 ; i < numberOfQuestions -1 ; i++) {
        browser.findElement(by.name(getRandomWithinLength(responses))).click();
    }
}


// Returns random element from list
function getRandomWithinLength(list) {
    return list[Math.floor((Math.random() * list.length))];
}










exports.directToIndex = directToIndex;
exports.directToPublic = directToPublic;
exports.directToViewAnswers = directToViewAnswers;
exports.directToViewParticipants = directToViewParticipants;

exports.clickRegisterAnswerButton = clickRegisterAnswerButton;
exports.clickSeeAllAnswers = clickSeeAllAnswers;
exports.clickSeeAllParticipants = clickSeeAllParticipants;
exports.clickMenuButton = clickMenuButton;
exports.clickStatistics = clickStatistics;
exports.clickTableStatistics = clickTableStatistics;
exports.clickComparisonStatistics = clickComparisonStatistics;
exports.clickAverageStatistics = clickAverageStatistics;
exports.clickStatisticMenuButton = clickStatisticMenuButton;

exports.clickStartButton = clickStartButton;
exports.clickToAnswerPage = clickToAnswerPage;
exports.clickMenuButton = clickMenuButton;
exports.clickEscapeButton = clickEscapeButton;

exports.fillAnswerRandomly = fillAnswerRandomly;
exports.fillAnswerMale = fillAnswerMale;
exports.fillAnswerFemale = fillAnswerFemale;

exports.registerParticipant = registerParticipant;
exports.submitParticipant = submitParticipant;

exports.deleteAnswers = deleteAnswers;

exports.deleteParticipants = deleteParticipants;
exports.pickWinner = pickWinner;



