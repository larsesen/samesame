/*jshint node: true*/
"use strict";

//uses the mysql package of node
var mysql = require("mysql");
var config = require("./config");


/*
the connection to the database, needs to be set up correctly
'host' is the ip of the host of the mysql server,
'user' and 'password' is the credentials defined by the mysql server
*/
var connection = mysql.createConnection( {
	multipleStatements: true, //for allowing stats calls
	host: config.dbOptions.dburl,
    user: config.dbOptions.dbuser,
	password: config.dbOptions.dbpassword
});

//connect to the db
connection.connect();

/*
generic function for executing queries.
logs all statements to the server-side console
*/
function query(queryStr, callback) {
	connection.query(queryStr, function(err, rows) {
		console.log("sql statement: " + queryStr);
		if (err) {
			callback(err);
		}
		else {
			callback(null, rows);
		}
	});
}


/*
function multipleQuery(query1, query2, query3, query4, callback) {
	connection.query("?; ?; ?; ?", [query1,query2,query3,query4],  function(err, results) {
		if (err) {
			callback(err);
		}
		else {
			callback(null, rows);
		}
	});
}
*/


//select all answers
function readAnswers(callback) {
	//console.log("db.readAnswers");
	query("select * from samesame.answers", callback);
}

//select a specific answer
function readOneAnswer(id, callback) {
	query("select * from samesame.answers where answerid = " + id + ";", callback);
}

/*
insert a new answer
values is an array containing the values to be inserted
also contains a comment to relax two warnings of JSHint
*/
function insertAnswer(values, callback) {
	/*jshint multistr: true, laxbreak: true*/
	query("INSERT INTO samesame.answers(userid, questionid, response)" +
		"VALUES ('" + values.userid + "', '" + values.questionid + "', '" + values.response + "');", callback);
}


//delete all answers
function deleteAnswers(callback) {
	query("truncate table samesame.answers", callback);
}



//delete a specific answer
function deleteAnswer(id, callback) {
	query("delete from samesame.answers where answerid = " + id, callback);
}

//select all participants
function getParticipants(callback) {
	query("select * from samesame.participants", callback);
}

/*
insert a new participant
values is an array containing the values to be inserted
*/
function insertParticipant(values, callback) {
	query("insert into samesame.participants(email, userid, name)" + 
		"values ('" + values.email + "', '" + values.userid + "', '" + values.name + "');", callback);
}


//delete all participants
function deleteParticipants(callback) {
	query("truncate table samesame.participants", callback);
}

//toggle the 'winner' field of a specific participant
function updateWinner(email, callback) {
	query ("update samesame.participants set winner = not winner where email = '" + email + "'", callback);
}

//delete all winners
function deleteWinners(callback) {
	query("update samesame.participants set winner = 0 where winner = 1", callback);
}

//export answers to CSV-file without the status fields (locked and processed)
function exportAnswers(callback) {
	query("SELECT userid, questionid, response from samesame.answers", callback);
			// INTO OUTFILE '" + exportPath + "answers" + dateHelper() + ".csv'\
}

//export participants to CSV-file without the winner field
function exportParticipants(callback) {
	query("SELECT email, name FROM samesame.participants", callback);
			//INTO OUTFILE '" + exportPath + "participants" + dateHelper() + ".csv'\
}







// =======================================================================================

//http://stackoverflow.com/questions/23266854/nodejs-mysql-multiple-delete-queries-in-1-statement
//http://stackoverflow.com/questions/6622746/approach-to-multiple-mysql-queries-with-node-js


function getAllAnswers(callback) {
	//console.log("db calling getStats");
	query("SELECT * FROM samesame.answers", callback);
}


function getStatistics(id, callback) {
	var q1 = "select distinct questionid from samesame.answers where questionid=1";
	var q2 = "select count(response) as a from samesame.answers where questionid=1 and response='a'";
	var q3 = "select count(response) as b from samesame.answers where questionid=1 and response='b'";
	var q4 = "select count(response) totalAnswers from samesame.answers where questionid=1";
	connection.query(q1 + ";" + q2 + ";" + q3 + ";" + q4 ,callback);
}

/*

	var q1 = "select distinct questionid from samesame.answers where questionid=" + id;
	var q2 = "select count(response) as a from samesame.answers where questionid=" + id + " and response='a'";
	var q3 = "select count(response) as b from samesame.answers where questionid=" + id + " and response='b'";
	var q4 = "select count(response) totalAnswers from samesame.answers where questionid=1";

*/










function getNumber(id, callback) {
	query("select questionid from answers where questionid = 1", callback);
}


function getNumberofResponses(id, callback) {
	query("SELECT COUNT(response) FROM answers WHERE questionid = " + id, callback);
}


function getSpecificResponse(questionid, response, callback) {
	query("SELECT COUNT(response) FROM answers WHERE questionid = " + questionid + " and response = " + id, callback);
}


/* 
		$scope.statData.questionid = ;
		select questionid from answers where questionid=1

		$scope.statData.responseA = ;
		select count(response) from answers where questionid=1 and response='a';

		$scope.statData.responseB = ;
		select count(response) from answers where questionid=1 and response='b';

		$scope.statData.totalanswered = ;
		select count(response) from answers where questionid=1;

*/


exports.getStatistics = getStatistics;
exports.getAllAnswers = getAllAnswers;



// =======================================================================================














exports.readAnswers            = readAnswers;
exports.readOneAnswer          = readOneAnswer;
exports.insertAnswer           = insertAnswer;
exports.deleteAnswers          = deleteAnswers;
exports.deleteAnswer           = deleteAnswer;
exports.getParticipants        = getParticipants;
exports.insertParticipant      = insertParticipant;
exports.deleteParticipants     = deleteParticipants;
exports.updateWinner           = updateWinner;
exports.deleteWinners          = deleteWinners;
exports.exportAnswers          = exportAnswers;
exports.exportParticipants     = exportParticipants;