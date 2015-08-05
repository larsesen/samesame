/*jshint node:true*/
"use strict";

/*
Access the methods in db.js
*/
var db = require("./db");

/*
Used to route '/' to index.html
*/
function index(req, res){
	res.redirect("/public/index.html");
}

/*
Get all answers from the database and return them as an array of JSON objects.
The parameter 'viewAll' determines whether all answers or only unprocessed are fetched
*/
function getAnswers(req, res) {
	db.readAnswers(function(err, rows) {
		if (err) {
			errorHandler(err, res);
		}
		else {
			res.send((rows));
		}
	});
	
	
}

/*
Get the answer with the id specified as parameter of the request.
*/
function getAnswer(req, res) {
	db.readOneAnswer(req.params.id, function(err, row) {
		if (err) {
			errorHandler(err, res);
		}
		else {
			res.send(row);
		}
	});
}

/*
Insert the answers received as data of the POST request into the database.
Is called from the CREATE method of the Answers service.
Converts the data values into a new 'values' object for easier naming, which is passed on to the database script.
*/
function insertAnswer(req, res) {
	//console.log("\n Request body is: " + JSON.stringify(req.body) + "\n");
	var values = {	
		userid: req.body.userid,
		questionid: req.body.questionid,
		response: req.body.response,
		sex: req.body.sex
	};
	db.insertAnswer(values, function(err, rows) {
		if (err) {
			errorHandler(err, res);
		}
		else {
			res.send("Successfully registered the answer \n");
			}
	});
}


/*
Truncate (clear/delete) the samesame.answers table.
*/
function deleteAnswers(req, res) {
	db.deleteAnswers(function(err, rows) {
		if (err) {
			errorHandler(err, res);
		}
		else {
			res.send("Successfully deleted all answers");
		}
	});
}

/*
Delete the answer with the id specified as parameter of the request
*/
function deleteAnswer(req, res){
	db.deleteAnswer(req.params.id, function(err, rows) {
		if (err) {
			errorHandler(err, res);
		}
		else {
			res.send("Successfully deleted answer with id " + req.params.id);
		}
	});
}


/*
Get all participants from the database
*/
function getParticipants(req, res) {
	db.getParticipants(function(err, rows) {
		if (err) {
			errorHandler(err, res);
		}
		else {
			res.send(rows);
		}
	});
}

/*
Insert the participant object received as data of the POST request.
Converts the data values into a new 'values' object for easier naming, which is passed on to the database script.
*/
function insertParticipant(req, res) {
	var values = {
			email: req.body.email, 
			userid: req.body.userid, 
			name: req.body.name, 
			prize: req.body.prize, bouvet: 
			req.body.bouvet
		};

	db.insertParticipant(values, function(err, rows) {
		if (err) {
			errorHandler(err, res);
		}
		else {
			res.send("Participant successfully registered");
		}
	});
}

/*
Truncate the bod.participants table.
*/
function deleteParticipants(req, res) {
	db.deleteParticipants(function(err, rows) {
		if (err) {
			errorHandler(err, res);
		}
		else {
			res.send("Successfully deleted all participants");
		}
	});
}

/*
Set the 'winner' field of all participants to 0, effectively deleting all winners
*/
function deleteWinners(req, res) {
	db.deleteWinners(function(err) {
		if (err) {
			errorHandler(err, res);
		}
		else {
			res.send("Successfully deleted all winners");
		}
	});
}

/*
Change the 'winner' field of the participant with the email specified as parameter of the requet.
Is set to 1 if it's currently 0, and to 0 if it's currently 1.
*/
function updateWinner(req, res) {
	db.updateWinner(req.params.email, function(err) {
		if (err) {
			errorHandler(err, res);
		}
		else {
			res.send("Participant " + req.params.email + " was marked as winner");
		}
	});
}

/*
Used to handle errors. Logs the error to the server-side console, and checks wheter the error is the one of duplicate entries.
The only case where duplicate entries can happen is the if the contact info of the participant to be registered already exists.
*/
function errorHandler(error, response) {
	console.log("There has been an error:");
	console.log(error);
	if (error.errno === 1062) {
		response.send(400, "The contact info already exists");
	}
	else {
		response.send(500, "There has been an error with the database, check the console for details...");
	}
}

/*
export answers to csv file
*/
function exportAnswers(req, res) {
	console.log("exporting answers to csv");
	db.exportAnswers(function(err, rows) {
		if(err) {
			errorHandler(err, res);
		}
		else {
			res.setHeader("Content-Disposition", "attachment; filename=answers.csv");
			res.setHeader('Content-Type', 'application/octet-stream');
			res.write(convertToCSV(JSON.stringify(rows)));
			res.end();
		}
	});
}

/*
export participants to csv file
*/
function exportParticipants(req, res) {
	console.log("exporting participants to csv");
	db.exportParticipants(function(err, rows) {
		if(err) {
			errorHandler(err, res);
		}
		else {
			res.setHeader("Content-Disposition","attachment; filename=participants.csv");
			res.setHeader('Content-Type', 'application/octet-stream');
			res.write(convertToCSV(JSON.stringify(rows)));
			res.end();
		}
	});
}

/*
http://www.gilgh.com/article/Create-CSV-file-using-JSON-data
*/
function convertToCSV(objArray) {
            var arrData = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
            var CSV = '';    
		    
		    var row = "";
		    //This loop will extract the label from 1st index of on array
		    for (var index in arrData[0]) {
		    	//Now convert each value to string and comma-seprated
		        row += index + ',';
		    }
		    row = row.slice(0, -1);
		    //append Label row with line break
		    CSV += row + '\r\n';

		    //1st loop is to extract each row
		    for (var i = 0; i < arrData.length; i++) {
		        row = "";
		        //2nd loop will extract each column and convert it in string comma-seprated
		        for (index in arrData[i]) {
					if (row !== '') row += ',';
		            row += arrData[i][index];
		        }
		        row.slice(0, row.length - 1);
		        //add a line break after each row
		        CSV += row + '\r\n';
		    }
		return CSV;
}





// =======================================================================================


function getAllAnswers(req, res) {
	db.getAllAnswers(function(err, rows) {
		if (err) {
			errorHandler(err, res);
		}
		else {
			res.send(rows);
		}
	});
}



/*=======================================
Statistics
=======================================*/


function getAverageStatistics(req,res) {
	db.getAverageStatistics(function(err, rows) {
		if (err) {
			errorHandler(err, res);
		}
		else {
			//console.log("Rows returned from db: " + JSON.stringify(rows));
			res.send(rows);
		}
	});
}

function getBouvetStatistics(req,res) {
	db.getBouvetStatistics(function(err, rows) {
		if (err) {
			errorHandler(err, res);
		}
		else {
			//console.log("Rows returned from db: " + JSON.stringify(rows));
			res.send(rows);
		}
	});
}

function getMaleStatistics(req,res) {
	db.getMaleStatistics(function(err, rows) {
		if (err) {
			errorHandler(err, res);
		}
		else {
			//console.log("Rows returned from db: " + JSON.stringify(rows));
			res.send(rows);
		}
	});
}

function getFemaleStatistics(req,res) {
	db.getFemaleStatistics(function(err, rows) {
		if (err) {
			errorHandler(err, res);
		}
		else {
			//console.log("Rows returned from db: " + JSON.stringify(rows));
			res.send(rows);
		}
	});
}


function getCounts(req,res) {
	db.getCounts(function(err, rows) {
		if (err) {
			errorHandler(err, res);
		}
		else {
			//console.log("Rows returned from db: " + JSON.stringify(rows));
			res.send(rows);
		}
	});
}


function getCurrentAnswers(req,res) {
	db.getCurrentAnswers(req.params.id, function(err,rows) {
		if (err) {
			errorHandler(err,res);
		}
		else {
			res.send(rows);
		}
	});
}






function getTypeData(req,res) {
	db.getTypeData(function(err,rows) {
		if (err) {
			errorHandler(err,res);
		}
		else {
			res.send(rows);
		}
	});
}

exports.getTypeData = getTypeData;




























/*
Exporting of all methods used by other scripts, mostly by router.js
*/

exports.index                 = index;
exports.getAnswers            = getAnswers;
exports.getAnswer             = getAnswer;
exports.insertAnswer          = insertAnswer;
exports.deleteAnswers         = deleteAnswers;
exports.deleteAnswer          = deleteAnswer;
exports.getParticipants       = getParticipants;
exports.insertParticipant     = insertParticipant;
exports.deleteParticipants    = deleteParticipants;
exports.deleteWinners         = deleteWinners;
exports.updateWinner          = updateWinner;
exports.exportAnswers         = exportAnswers;
exports.exportParticipants    = exportParticipants;

exports.getAllAnswers = getAllAnswers;
exports.getAverageStatistics = getAverageStatistics;
exports.getBouvetStatistics = getBouvetStatistics;
exports.getMaleStatistics = getMaleStatistics;
exports.getFemaleStatistics = getFemaleStatistics;
exports.getCounts = getCounts;


exports.getCurrentAnswers = getCurrentAnswers;
