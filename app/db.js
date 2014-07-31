/*jshint node: true*/
"use strict";

//uses the mysql package of node
var mysql = require("mysql");

/*
the connection to the database, needs to be set up correctly
'host' is the ip of the host of the mysql server,
'user' and 'password' is the credentials defined by the mysql server
*/
var connection = mysql.createConnection( {
	host: "10.1.102.26",
	user: "root",
	password: "test"
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
	query("select * from bod.answers", callback);
}

//select only unproccessed answers
function readUnprocessedAnswers(callback) {
	query("select * from bod.answers where processed = 0", callback);
}

//select a specific answer
function readOneAnswer(id, callback) {
	query("select * from bod.answers where id_answers = " + id + ";", callback);
}

/*
insert a new answer
values is an array containing the values to be inserted
also contains a comment to relax two warnings of JSHint
*/
function insertAnswer(values, callback) {
	/*jshint multistr: true, laxbreak: true*/
	query("insert into bod.answers(sivilstatus, pa_hodet, type, studiested, \
		programmeringsstil, musikk, personlighet, hypepreferanse, favorittgode, \
		planerforkvelden, premiehvisduvinner, kjonn)" +
		"values ('" + values.sivilstatus +"', '" + values.pa_hodet +"', '" + values.type
		 + "', '" + values.studiested +"', '" + values.programmeringsstil +"', '" + values.musikk
		 + "', '" + values.personlighet +"', '" + values.hypepreferanse  +"', '" + values.favorittgode
		 + "', '" + values.planerforkvelden +"', '" + values.premiehvisduvinner+ "', '"
		 + values.kjonn + "');",callback);
}

//delete all answers
function deleteAnswers(callback) {
	query("truncate table bod.answers", callback);
}

//toggle the 'processed' field of a specific answer
function toggleProcessedAnswer(id, callback) {
	query("update bod.answers set processed = not processed where id_answers = " + id, callback);
}

//toggle the 'locked' field of a specific answer
function toggleLockAnswer(id, callback) {
	query("update bod.answers set locked = not locked where id_answers = " + id, callback);
}

//delete a specific answer
function deleteAnswer(id, callback) {
	query("delete from bod.answers where id_answers = " + id, callback);
}

//select all participants
function getParticipants(callback) {
	query("select * from bod.participants", callback);
}

/*
insert a new participant
values is an array containing the values to be inserted
*/
function insertParticipant(values, callback) {
	query("insert into bod.participants(email, name, prize)" + 
		"values ('" + values.email + "', '" + values.name + "', '" + values.prize + "');", callback);
}

//delete all participants
function deleteParticipants(callback) {
	query("truncate table bod.participants", callback);
}

//toggle the 'winner' field of a specific participant
function updateWinner(email, callback) {
	query ("update bod.participants set winner = not winner where email = '" + email + "'", callback);
}

//delete all winners
function deleteWinners(callback) {
	query("update bod.participants set winner = 0 where winner = 1", callback);
}



exports.readAnswers            = readAnswers;
exports.readUnprocessedAnswers = readUnprocessedAnswers;
exports.readOneAnswer          = readOneAnswer;
exports.insertAnswer           = insertAnswer;
exports.deleteAnswers          = deleteAnswers;
exports.toggleProcessedAnswer  = toggleProcessedAnswer;
exports.toggleLockAnswer       = toggleLockAnswer;
exports.deleteAnswer           = deleteAnswer;
exports.getParticipants        = getParticipants;
exports.insertParticipant      = insertParticipant;
exports.deleteParticipants     = deleteParticipants;
exports.updateWinner           = updateWinner;
exports.deleteWinners          = deleteWinners;