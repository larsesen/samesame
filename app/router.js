/*jshint node:true*/
"use strict";

//Access the methods exported from user.js
var user = require("./user");



//Routing:

module.exports = function(app) {

//default route
	app.route("/")
		.get(user.index);

/*
route for accessing multiple answers or create a new answer
supports GET, POST, DELETE
*/
	app.route("/answers")
		//used to get all answers in json format
		.get(user.getAllAnswers)
		
		//used to insert a new answer
		.post(user.insertAnswer)
		
		//used to truncate the table containing the answers
		.delete(user.deleteAllAnswers);

/*
route for accessing specific answers based on the id provided as parameter
supports GET, PUT, DELETE
*/
	app.route("/answers/:id")
		//used to get the answer with the specified id
		.get(user.getSingleAnswer)
		
		//used to delete the answer with the specified id
		.delete(user.deleteSingleAnswer);



/*
route for accessing multiple participants
supports GET, POST, DELETE
*/
	app.route("/participants")
		//used to get all participants in json format
		.get(user.getParticipants)
		
		//used to insert a new participant
		.post(user.insertParticipant)
		
		//used to truncate the table containing participants
		.delete(user.deleteParticipants);

/*
route for creating a winner with the specified email/contact info as primary key
actually changes the 'winner' field of the participant with that primary key from 0 to 1, but for the user it 'creates' a winner
*/
	app.route("/winners/:email")
		.post(user.updateWinner);

/*
route for deleting all winners, sets the 'winner' field of all participants to 0, but for the user is 'deletes' all winners
*/
	app.route("/winners")
		//used to reset all fields indicating winners
		.delete(user.deleteWinners);

	app.route("/exportAnswers")
		.get(user.exportAnswers);

	app.route("/exportParticipants")
		.get(user.exportParticipants);





/*
Routes for retrieving statistics
*/

	app.route("/statsAverage")
		.get(user.getAverageStatistics);

	app.route("/statsBouvet")
		.get(user.getBouvetStatistics);

	app.route("/statsMale")
		.get(user.getMaleStatistics);

	app.route("/statsFemale")
		.get(user.getFemaleStatistics);

	app.route("/statsCount")
		.get(user.getCounts);


	app.route("/currentAnswers/:id")
		.get(user.getCurrentAnswers);

	app.route("/getTypeData")
		.get(user.getTypeData);

};