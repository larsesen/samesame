"use strict";

/*Services for samesameApp*/
angular.module("samesameApp.services", [])
	
	//service that communicates with the REST API for answers
	.factory("Answers", function($http) {
		return {
			//gets all answers with a boolean parameter to determine whether all answers or only unprocessed should be fetched
			getAll : function(viewAllArg) {
				return $http.get("/answers", {
					params : {
						viewAll : viewAllArg
					}
				});
			},
			//get the answer with the specified id
			get : function(id) {
				return $http.get("/answers/" + id);
			},
			//locks the answer with the specified id
			toggleLock : function(id) {
				return $http.put("/toggleLockAnswer/" + id);
			},
			//updates the processed status of the answer with the specified id
			update : function(id) {
				return $http.put("/answers/" + id);
			},
			//deletes all answers
			deleteAll : function() {
				return $http.delete("/answers");
			},
			//creates a new answer based on the answer object passed in
			create : function(answer) {
				return $http.post("/answers", answer);
			},
			//deletes the answer with the specified id
			delete : function(id) {
				return $http.delete(/answers/ + id);
			},
			export : function() {
				return $http.get("/exportAnswers");
			}
		};
	})

	//service that communicates with the REST API for participants
	.factory("Participants", function($http) {
		return {
			//gets all participants
			getAll : function() {
				return $http.get("/participants");
			},
			//deletes all participants
			deleteAll : function() {
				return $http.delete("/participants");
			},
			//creates a new participant based on the participant object passed in
			create : function(participant) {
				return $http.post("/participants", participant);
			},
			//marks the participant with that email as winner
			updateWinner: function(email) {
				return $http.post("/winners/" + email);
			},
			//deletes all winners (sets the 'winner' field of all participants to 0)
			deleteWinners: function() {
				return $http.delete("/winners");
			},
			export : function() {
				return $http.get("/exportParticipants");
			}
		};
	})

	.factory("Questions", function() {
		/*
		The object that contains the questions.
		To see how this is used, please check the html file where they are displayed, 'partial-register-answer.html'
		The output field is the value displayed to the user, the 'value' field is the the value stored in the database
		*/

		return {
			question1: {
				questionid: '1',
				options : [
				{
					output : 'A',
					value : 'a',
					imageURL : "./images/1a.png"
				}, {
					output : 'B',
					value : 'b',
					imageURL : "./images/1b.png",
				}
				],
			}
			
			,
			question2: {
				questionid: '2',
				options : [
				{
					output : 'A',
					value : 'a',
					imageURL : "./images/2a.png"

				}, {
					output : 'B',
					value : 'b',
					imageURL : "./images/2a.png"
				}
				],
			},
			question3: {
				questionid: '3',
				options : [
				{
					output : 'A',
					value : 'a',
					imageURL : "./images/3a.png"
				}, {
					output : 'B',
					value : 'b',
					imageURL : "./images/3b.png"
				}
				]
			},	
			question4: {
				questionid: '4',
				options : [
				{
					output : 'A',
					value : 'a',
					imageURL : "./images/4a.png"
				}, {
					output : 'B',
					value : 'b',
					imageURL : "./images/4b.png"
				}
				]
			},
			question5: {
				questionid: '5',
				options : [
				{
					output : 'A',
					value : 'a',
					imageURL : "./images/5a.png"
				}, {
					output : 'B',
					value : 'b',
					imageURL : "./images/5b.png"
				}
				]
			},
			question6: {
				questionid: '6',
				options : [
				{
					output : 'A',
					value : 'a',
					imageURL : "./images/6a.png"
				}, {
					output : 'B',
					value : 'b',
					imageURL : "./images/6b.png"
				}
				]
			},
			question7: {
				questionid: '7',
				options : [
				{
					output : 'A',
					value : 'a',
					imageURL : "./images/7a.png"
				}, {
					output : 'B',
					value : 'b',
					imageURL : "./images/7b.png"
				}
				]
			}

















		};
	})



	.factory("RecentAnswer", function($http) {
		var answer = {};
		return {
			setAnswer : function(recAnswer) {
				answer = {
					userid : recAnswer.userid,
					questionid : recAnswer.questionid,
					response : recAnswer.response
				};
			},
			getAnswer : function() {
				return answer;
			}
		};
	})



	.factory("QuestionData", function($http) {
		var QuestionData = {};
				
		return {
			initQuestionData : function(data) {
				QuestionData = {
					userid : data
				};
				//console.log("initQuestionData: " + JSON.stringify(QuestionData.userid));
			},

			getInitQuestionData : function(data) {
				return QuestionData.userid;
			}


		};
	})

	


	.factory("AnsweredQuestions", function($http) {
		var answeredQuestions = {};
		
		return {
			

			initAnsweredQuestions : function(length) {
				answeredQuestions = new Array(length);
				var i;
				for (i = 1 ; i < length+1 ; i++) {
					answeredQuestions[i] = i;
				}
				return answeredQuestions;
			},

			removeIndex : function(answeredQuestions, index) {
				delete answeredQuestions[index];
				return answeredQuestions;
			},


			getNextQuestion : function(answeredQuestions) {
				var questionNumber = null;


				if (isListEmpty(answeredQuestions)) {
					return "tomt";
				}

				else {
					while (questionNumber == null) {
						questionNumber = answeredQuestions[Math.floor(Math.random() * answeredQuestions.length)];
					}
				}
				return questionNumber;
			},

			getAnsweredQuestions : function() {
				return answeredQuestions;
			},


		};
	})



	




	