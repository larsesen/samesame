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
					value : 'a',
					description : 'kjonn', 
					imageURL : "./images/1a.png"
				}, {
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
					value : 'a',
					description : 'filtype A', 
					imageURL : "./images/2a.png"

				}, {
					value : 'b',
					imageURL : "./images/2a.png"
				}
				],
			},
			question3: {
				questionid: '3',
				options : [
				{
					value : 'a',
					description : 'Notifications',  
					imageURL : "./images/3a.png"
				}, {
					value : 'b',
					imageURL : "./images/3b.png"
				}
				]
			},	
			question4: {
				questionid: '4',
				options : [
				{
					value : 'a',
					description: 'dorull',  
					imageURL : "./images/4a.png"
				}, {
					value : 'b',
					imageURL : "./images/4b.png"
				}
				]
			},
			question5: {
				questionid: '5',
				options : [
				{
					value : 'a',
					description: 'propper',
					imageURL : "./images/5a.png"
				}, {
					value : 'b',
					imageURL : "./images/5b.png"
				}
				]
			},
			question6: {
				questionid: '6',
				options : [
				{
					value : 'a',
					description:  'gir',
					imageURL : "./images/6a.png"
				}, {
					value : 'b',
					imageURL : "./images/6b.png"
				}
				]
			},
			question7: {
				questionid: '7',
				options : [
				{
					value : 'a',
					description: 'alarmer',
					imageURL : "./images/7a.png"
				}, {
					value : 'b',
					imageURL : "./images/7b.png"
				}
				]
			},
			question8: {
				questionid: '8',
				options : [
				{
					value : 'a',
					description: 'mac',
					imageURL : "./images/8a.jpg"
				}, {
					value : 'b',
					imageURL : "./images/8b.jpg"
				}
				]
			}
		};
	})


	.factory("Prize", function() {

		return {
			question1: {
				questionid: '1',
				options : [
				{
					value : 'a',
					imageURL : "./images/prize/1a.png"
				}, {
					value : 'b',
					imageURL : "./images/prize/1b.png",
				}
				],
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

				while (questionNumber == null) {
					questionNumber = answeredQuestions[Math.floor(Math.random() * answeredQuestions.length)];
				}
				return questionNumber;
			},

			getAnsweredQuestions : function() {
				return answeredQuestions;
			}
		};
	})



	//Used to propagate userid throughout application
	.service("UserIDService", function() {
		var userid;

		var setUserID = function(id) {
			userid = id;
		};

		var getUserID = function() {
			return userid;
		};

		return {
			setUserID: setUserID,
			getUserID: getUserID
		};
	})





	.factory("Statistics", function($http) {
		var allStat = [],
			statAverage = [],
			statBouvet = [],
			statMale = [],
			statFemale = [],
			statObject = {};
		
		var counts = [];

		var statPercentage = []

		var currentAnswers = [];

		var activeObject;
		
		return {

			/*
			The type variable is used to differentiate between the different kinds of average persons we want to obtain values from.
			type = 1 --> Average
			type = 2 --> Bouvet
			type = 3 --> Male
			type = 4 --> Female
			*/

			//retrieves statistics from db
			retrieveStatistics : function(type) {
				if (type === 1) {
					return $http.get("/statsAverage");
				}
				else if (type === 2) {
					return $http.get("/statsBouvet");
				}
				else if (type === 3) {
					return $http.get("/statsMale");
				}
				else if (type === 4) {
					return $http.get("/statsFemale");
				}
			},


			//resets data before retrieving to avoid duplication
			resetStatistics : function(type) {
				statAverage = [];
				statBouvet = [];
				statMale = [];
				statFemale = [];
				allStat = [];
			},
			
			getAllStats : function(type) {
				return allStat;
			},


			getStatistics : function(type) {
				if (type === 1 ) {
					return statAverage;
				}
				else if (type === 2) {
					return statBouvet;
				}
				else if (type === 3) {
					return statMale;
				}
				else if (type === 4) {
					return statFemale;
				}
			},

			//creates one statObject per questionid, and pushes object to respective statList which is used to retrieve data
			setStatistics : function(currObject, type) {
				var i;			
				for (i = 0 ; i < currObject.length ; i++) {
					statObject = {
						
						questionid : currObject[i]["questionid"],
						responseA : currObject[i]["a"],
						percentageA : currObject[i]["a_"],
						responseB : currObject[i]["b"],
						percentageB : currObject[i]["b_"],
						total : currObject[i]["total"],
	
						mostFreq : currObject[i]["mostFreq"],
						greatest : currObject[i]["greatest"]
					}

					if ( type === 1 ) {
						statAverage.push(statObject);
					}
					else if (type === 2) {
						statBouvet.push(statObject);
					}
					else if (type === 3) {
						statMale.push(statObject);
					}
					else if (type === 4) {
						statFemale.push(statObject);
					}

					
				}
				if ( type === 1 ) {
					statAverage.name = "Average";
					allStat.push(statAverage);
				}
				else if (type === 2) {
					statBouvet.name = "Bouvet";
					allStat.push(statBouvet);
				}
				else if (type === 3) {
					statMale.name = "Male";
					allStat.push(statMale);
				}
				else if (type === 4) {
					statFemale.name = "Female";
					allStat.push(statFemale);
				}
				//console.log(JSON.stringify(allStat));
			},



			retrieveCounts : function() {
				return $http.get("/statsCount");
			},
			
			resetCounts : function() {
				counts = [];
			},

			getCounts : function() {
				return counts;
			},

			setCounts : function(currObject) {
				var i;			
				for (i = 0 ; i < currObject.length ; i++) {

					statObject = {	
						total : currObject[i][0]["total"],
						bouvet : currObject[i][0]["bouvet"],
						male : currObject[i][0]["male"],
						female : currObject[i][0]["female"]
					}			
					counts.push(statObject);					
				}
			},




			/*
			Comparing module after register-answer but before register-participant: 
			*/
			retrieveCurrentAnswers : function(id) {
				statPercentage = [];
				return $http.get("/currentAnswers/" + id);
			},


			getCurrentAnswers : function() {
				return currentAnswers;
			},


			compareAnswers : function(average, currList) {
			
				var i;
				var result = 0;
				var counter = 0;
				
				for (i = 0; i < average.length; i++) {
					/*
					console.log("Average: Q" + average[i]["questionid"] + ", Response: " + average[i]["mostFreq"]);
					console.log("Current: Q" + currList[i]["questionid"] + ", Response: " + currList[i]["response"]);			
					*/
					if (average[i]["questionid"] === currList[i]["questionid"] && average[i]["mostFreq"] === currList[i]["response"]) {
						counter ++;
					}
				} 
				result = (counter/currList.length)*100;
				//console.log(result);
				statPercentage.push(result);
			},



			setCurrentAnswers : function(currObject) {
				currentAnswers = [];
				var i;			

				for (i = 0 ; i < currObject.length ; i++) {

					statObject = {	
						questionid : currObject[i]["questionid"],
						response : currObject[i]["response"]
					}			
					currentAnswers.push(statObject);					
				}
			},

			getPercentageStats : function() {
				return statPercentage;
			}
		};
	})






	//Used to hold editable textfields throughout application
	.service("TextStrings", function() {
		

		var getMainTitle = function() {
			return "Same same, but different";
		};

		var getSecondaryTitle = function() {
			return "There are two kinds of people";
		};

		var getDottedLine = function() {
			return "- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -";
		}

		var getRegisterAnswerHeader = function() {
			return "Choose one picture from each category";
		}

		return {
			getMainTitle : getMainTitle,
			getSecondaryTitle : getSecondaryTitle,
			getDottedLine : getDottedLine,
			getRegisterAnswerHeader : getRegisterAnswerHeader
		};
	})


	