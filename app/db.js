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





/*========================
Answer queries
========================*/

//select all answers
function getAllAnswers(callback) {
	query("select * from samesame.answers", callback);
}


//select a specific answer
function getSingleAnswer(id, callback) {
	query("select * from samesame.answers where answerid = " + id + ";", callback);
}


/*
insert a new answer. Values is an array containing the values to be inserted
also contains a comment to relax two warnings of JSHint
*/
function insertAnswer(values, callback) {
	/*jshint multistr: true, laxbreak: true*/
	query("INSERT INTO samesame.answers(userid, questionid, response, gender)" +
		"VALUES ('" + values.userid + "', '" + values.questionid + "', '" + values.response + "', '" + values.gender + "');", callback);
}


//delete all answers
function deleteAllAnswers(callback) {
	query("truncate table samesame.answers", callback);
}



//delete a specific answer
function deleteSingleAnswer(id, callback) {
	query("delete from samesame.answers where answerid = " + id, callback);
}

//export answers to CSV-file without the status fields (locked and processed)
function exportAnswers(callback) {
	query("SELECT userid, questionid, response from samesame.answers", callback);
			// INTO OUTFILE '" + exportPath + "answers" + dateHelper() + ".csv'\
}



/*========================
Participant queries
========================*/

//select all participants
function getParticipants(callback) {
	query("select * from samesame.participants", callback);
}

/*
insert a new participant. Values is an array containing the values to be inserted
*/
function insertParticipant(values, callback) {
	query("insert into samesame.participants(email, userid, name, prize, bouvet)" + 
		"values ('" + values.email + "', '" + values.userid + "', '" + values.name + "', '" + values.prize + "', '" + values.bouvet + "');", callback);
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

//export participants to CSV-file without the winner field
function exportParticipants(callback) {
	query("SELECT email, name FROM samesame.participants", callback);
			//INTO OUTFILE '" + exportPath + "participants" + dateHelper() + ".csv'\
}



/*===========================================================================
Statistics queries
SQL queries returns a lot of information, where a single view does not necessarily use all data, but all data is used somewhere.

Complete statement is copied as a comment inside each function to easily test it out in MySQL command line without dealing with syntax.
===========================================================================*/


function getAverageStatistics(callback) {
	query("select *, greatest(a,b) as greatest, (a+b) as total, if(a>b, 'a', 'b') as mostFreq, round((a/(a+b)*100),2) as a_, " +
		"round((b/(a+b)*100),2) as b_ from (select questionid, sum(case when response='a' then 1 else 0 end) a, sum(case when response='b' then 1 else 0 end) b " + 
			"from samesame.answers group by questionid) x", callback);
/*
select *, greatest(a,b) as greatest, (a+b) as total, if(a>b, 'a', 'b') as mostFreq, round((a/(a+b)*100),2) as a_, round((b/(a+b)*100),2) as b_ 
from (select questionid, sum(case when response='a' then 1 else 0 end) a, sum(case when response='b' then 1 else 0 end) b from samesame.answers group by questionid) x
*/
}


function getBouvetStatistics(callback) {
	query("select *, greatest(a,b) as greatest, (a+b) as total, if(a>b, 'a', 'b') as mostFreq, round((a/(a+b)*100),2) as a_, round((b/(a+b)*100),2) as b_ " +
		"from (select questionid, sum(case when response='a' then 1 else 0 end) a, sum(case when response='b' then 1 else 0 end) b " + 
			"from samesame.answers, samesame.participants where answers.userid=participants.userid and bouvet=1 group by questionid) x", callback);
/*
select *, greatest(a,b) as greatest, (a+b) as total, if(a>b, 'a', 'b') as mostFreq, round((a/(a+b)*100),2) as a_, round((b/(a+b)*100),2) as b_ 
from (select questionid, sum(case when response='a' then 1 else 0 end) a, sum(case when response='b' then 1 else 0 end) b 
from samesame.answers, samesame.participants where answers.userid=participants.userid and bouvet=1 group by questionid) x;
*/
}


function getMaleStatistics(callback) {
	query("select *, greatest(a,b) as greatest, (a+b) as total, if(a>b, 'a', 'b') as mostFreq, round((a/(a+b)*100),2) as a_, round((b/(a+b)*100),2) as b_ " +
		"from (select questionid, sum(case when response='a' then 1 else 0 end) a, sum(case when response='b' then 1 else 0 end) b " + 
			"from samesame.answers where gender='m' group by questionid) x", callback);
/*
select *, greatest(a,b) as greatest, (a+b) as total, if(a>b, 'a', 'b') as mostFreq, round((a/(a+b)*100),2) as a_, round((b/(a+b)*100),2) as b_ 
from (select questionid, sum(case when response='a' then 1 else 0 end) a, sum(case when response='b' then 1 else 0 end) b 
from samesame.answers where gender='m' group by questionid) x;
*/
}


function getFemaleStatistics(callback) {
	query("select *, greatest(a,b) as greatest, (a+b) as total, if(a>b, 'a', 'b') as mostFreq, round((a/(a+b)*100),2) as a_, round((b/(a+b)*100),2) as b_ " +
		"from (select questionid, sum(case when response='a' then 1 else 0 end) a, sum(case when response='b' then 1 else 0 end) b " + 
			"from samesame.answers where gender='f' group by questionid) x", callback);
/*
select *, greatest(a,b) as greatest, (a+b) as total, if(a>b, 'a', 'b') as mostFreq, round((a/(a+b)*100),2) as a_, round((b/(a+b)*100),2) as b_ 
from (select questionid, sum(case when response='a' then 1 else 0 end) a, sum(case when response='b' then 1 else 0 end) b 
from samesame.answers where gender='f' group by questionid) x;
*/
}


//Retrieving the four different counts
function getCounts(callback) {
	query("select count(*) as total from samesame.answers;" + 
		"select count(*) as bouvet from samesame.answers,samesame.participants where samesame.answers.userid = samesame.participants.userid and bouvet=1;"+
		"select count(*) as male from samesame.answers where gender='m';" +
		"select count(*) as female from samesame.answers where gender='f'", callback);
/*
select count(*) as total from samesame.answers; select count(*) as bouvet from samesame.answers,samesame.participants 
where samesame.answers.userid = samesame.participants.userid and bouvet=1; select count(*) as male from samesame.answers where gender='m'; 
select count(*) as female from samesame.answers where gender='f';
*/
}


function getCurrentAnswers(id, callback) {
	query("Select questionid, response from samesame.answers where userid=" + id, callback);
}


function getTypeData(callback) {
	query("select questionid, if(a>b, 'a', 'b') as mostFreq, round((a/(a+b)*100),2) as a_, round((b/(a+b)*100),2) as b_ " + 
		" from (select questionid, sum(case when response='a' then 1 else 0 end) a, sum(case when response='b' then 1 else 0 end) b " + 
		" from samesame.answers group by questionid) x", callback);
/*
select questionid, if(a>b, 'a', 'b') as mostFreq, round((a/(a+b)*100),2) as a_, round((b/(a+b)*100),2) as b_ from (select questionid, 
sum(case when response='a' then 1 else 0 end) a, sum(case when response='b' then 1 else 0 end) b from samesame.answers group by questionid) x;
*/
}







/*========================
Exporting methods
========================*/

exports.getAllAnswers         = getAllAnswers;
exports.getSingleAnswer       = getSingleAnswer;
exports.insertAnswer          = insertAnswer;
exports.deleteAllAnswers      = deleteAllAnswers;
exports.deleteSingleAnswer    = deleteSingleAnswer;
exports.exportAnswers         = exportAnswers;

exports.getParticipants       = getParticipants;
exports.insertParticipant     = insertParticipant;
exports.deleteParticipants    = deleteParticipants;
exports.updateWinner          = updateWinner;
exports.deleteWinners         = deleteWinners;
exports.exportParticipants    = exportParticipants;

exports.getAverageStatistics  = getAverageStatistics;
exports.getBouvetStatistics   = getBouvetStatistics;
exports.getMaleStatistics     = getMaleStatistics;
exports.getFemaleStatistics   = getFemaleStatistics;
exports.getCounts             = getCounts;

exports.getCurrentAnswers     = getCurrentAnswers;
exports.getTypeData           = getTypeData;









