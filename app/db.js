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

//select all answers
function readAnswers(callback) {
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












/*
TO BE DELETED:
*/

/*
END DELETING HERE
*/
















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