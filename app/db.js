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
	query("INSERT INTO samesame.answers(userid, questionid, response, sex)" +
		"VALUES ('" + values.userid + "', '" + values.questionid + "', '" + values.response + "', '" + values.sex + "');", callback);
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






function getAllAnswers(callback) {
	//console.log("db calling getStats");
	query("SELECT * FROM samesame.answers", callback);
}








/*===========================================================================
Statistics
SQL queries returns a lot of information, where a single view does not necessarily use all data, but all data is used somewhere.
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
			"from samesame.answers where sex='m' group by questionid) x", callback);
/*
select *, greatest(a,b) as greatest, (a+b) as total, if(a>b, 'a', 'b') as mostFreq, round((a/(a+b)*100),2) as a_, round((b/(a+b)*100),2) as b_ 
from (select questionid, sum(case when response='a' then 1 else 0 end) a, sum(case when response='b' then 1 else 0 end) b 
from samesame.answers where sex='m' group by questionid) x;
*/
}


function getFemaleStatistics(callback) {
	query("select *, greatest(a,b) as greatest, (a+b) as total, if(a>b, 'a', 'b') as mostFreq, round((a/(a+b)*100),2) as a_, round((b/(a+b)*100),2) as b_ " +
		"from (select questionid, sum(case when response='a' then 1 else 0 end) a, sum(case when response='b' then 1 else 0 end) b " + 
			"from samesame.answers where sex='f' group by questionid) x", callback);
/*
select *, greatest(a,b) as greatest, (a+b) as total, if(a>b, 'a', 'b') as mostFreq, round((a/(a+b)*100),2) as a_, round((b/(a+b)*100),2) as b_ 
from (select questionid, sum(case when response='a' then 1 else 0 end) a, sum(case when response='b' then 1 else 0 end) b 
from samesame.answers where sex='f' group by questionid) x;
*/
}


//Retrieving the four different counts
function getCounts(callback) {
	query("select count(*) as total from samesame.answers;" + 
		"select count(*) as bouvet from samesame.answers,samesame.participants where samesame.answers.userid = samesame.participants.userid and bouvet=1;"+
		"select count(*) as male from samesame.answers where sex='m';" +
		"select count(*) as female from samesame.answers where sex='f'", callback);
}


function getCurrentAnswers(id, callback) {
	query("Select questionid, response from samesame.answers where userid=" + id, callback);
}



/*

select questionid, round((a/(a+b)*100),2) as a_, round((b/(a+b)*100),2) as b_ 
from (select questionid, sum(case when response='a' then 1 else 0 end) a, sum(case when response='b' then 1 else 0 end) b from samesame.answers group by questionid) x;


1438765647029

//To retrieve questionid, most selected answer, as well as percentages for a and b.
select questionid, if(a>b, 'a', 'b') as mostFreq, round((a/(a+b)*100),2) as a_, round((b/(a+b)*100),2) as b_ from (select questionid, sum(case when response='a' then 1 else 0 end) a, 
sum(case when response='b' then 1 else 0 end) b 
from samesame.answers group by questionid) x;

*/

function getTypeData(callback) {
	query("select questionid, if(a>b, 'a', 'b') as mostFreq, round((a/(a+b)*100),2) as a_, round((b/(a+b)*100),2) as b_ " + 
		" from (select questionid, sum(case when response='a' then 1 else 0 end) a, sum(case when response='b' then 1 else 0 end) b " + 
		" from samesame.answers group by questionid) x", callback);
}

exports.getTypeData = getTypeData;





























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


exports.getAllAnswers = getAllAnswers;

exports.getAverageStatistics = getAverageStatistics;
exports.getBouvetStatistics = getBouvetStatistics;
exports.getMaleStatistics = getMaleStatistics;
exports.getFemaleStatistics = getFemaleStatistics;
exports.getCounts = getCounts;


exports.getCurrentAnswers = getCurrentAnswers;









