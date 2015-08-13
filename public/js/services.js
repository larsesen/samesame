"use strict";

/*Services for samesameApp*/
angular.module("samesameApp.services", [])
	
	//service that communicates with the REST API for answers
	.factory("Answers", function($http) {
		return {
			//gets all answers with a boolean parameter to determine whether all answers or only unprocessed should be fetched
			getAll : function() {
				return $http.get("/answers");
			},
			//get the answer with the specified id
			get : function(id) {
				return $http.get("/answers/" + id);
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
			//exports db data to excel file
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
					imageURL : "./images/8a.png"
				}, {
					value : 'b',
					imageURL : "./images/8b.png"
				}
				]
			}
			
			
			,
			question9: {
				questionid: '9',
				options : [
				{
					value : 'a',
					imageURL : "./images/9a.png"
				}, {
					value : 'b',
					imageURL : "./images/9b.png"
				}
				]
			}
		
			,
			question10: {
				questionid: '10',
				options : [
				{
					value : 'a',
					imageURL : "./images/10a.png"
				}, {
					value : 'b',
					imageURL : "./images/10b.png"
				}
				]
			}

			,
			question11: {
				questionid: '11',
				options : [
				{
					value : 'a',
					imageURL : "./images/11a.png"
				}, {
					value : 'b',
					imageURL : "./images/11b.png"
				}
				]
			},
			question12: {
				questionid: '12',
				options : [
				{
					value : 'a',
					imageURL : "./images/12a.png"
				}, {
					value : 'b',
					imageURL : "./images/12b.png"
				}
				]
			},
			question13: {
				questionid: '13',
				options : [
				{
					value : 'a',
					imageURL : "./images/13a.png"
				}, {
					value : 'b',
					imageURL : "./images/13b.png"
				}
				]
			},
			question14: {
				questionid: '14',
				options : [
				{
					value : 'a',
					imageURL : "./images/14a.png"
				}, {
					value : 'b',
					imageURL : "./images/14b.png"
				}
				]
			}
			/*
			,
			question15: {
				questionid: '15',
				options : [
				{
					value : 'a',
					imageURL : "./images/15a.png"
				}, {
					value : 'b',
					imageURL : "./images/15b.png"
				}
				]
			},
			question16: {
				questionid: '16',
				options : [
				{
					value : 'a',
					imageURL : "./images/16a.png"
				}, {
					value : 'b',
					imageURL : "./images/16b.png"
				}
				]
			},
			question17: {
				questionid: '17',
				options : [
				{
					value : 'a',
					imageURL : "./images/17a.png"
				}, {
					value : 'b',
					imageURL : "./images/17b.png"
				}
				]
			},
			question18: {
				questionid: '18',
				options : [
				{
					value : 'a',
					imageURL : "./images/18a.jpg"
				}, {
					value : 'b',
					imageURL : "./images/18b.jpg"
				}
				]
			}
			*/
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
				//index starts from 1 to avoid retrieving gender-question in real questionnaire
				for (i = 1 ; i < length+1 ; i++) {
					answeredQuestions[i] = i;
				}
				return answeredQuestions;
			},

			removeIndex : function(answeredQuestions, index) {
				delete answeredQuestions[index];
				//return answeredQuestions;
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
		var userid,
			usergender

		var setUserID = function(id) {
			userid = id;
		};

		var getUserID = function() {
			return userid;
		};

		var setGender = function(gender) {
			usergender = gender;
		};

		var getGender = function() {
			return usergender;
		};


		return {
			setUserID: setUserID,
			getUserID: getUserID,
			setGender: setGender,
			getGender: getGender
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

		var typeData = [],
			comparisons = [];

		
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
				if (type === 0) {
					return $http.get("/statsAverage");
				}
				else if (type === 1) {
					return $http.get("/statsBouvet");
				}
				else if (type === 2) {
					return $http.get("/statsMale");
				}
				else if (type === 3) {
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
				if (type === 0 ) {
					return statAverage;
				}
				else if (type === 1) {
					return statBouvet;
				}
				else if (type === 2) {
					return statMale;
				}
				else if (type === 3) {
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
						percentageAText : currObject[i]["a_"] < 50 ? '' : (currObject[i]["a_"] + ' %'),
						responseB : currObject[i]["b"],
						percentageB : currObject[i]["b_"],
						percentageBText : currObject[i]["b_"] <= 50 ? '' : (currObject[i]["b_"] + ' %'),
						total : currObject[i]["total"],
	
						mostFreq : currObject[i]["mostFreq"],
						greatest : currObject[i]["greatest"]
					}

					if ( type === 0 ) {
						statAverage.push(statObject);
					}
					else if (type === 1) {
						statBouvet.push(statObject);
					}
					else if (type === 2) {
						statMale.push(statObject);
					}
					else if (type === 3) {
						statFemale.push(statObject);
					}

					
				}
				if ( type === 0 ) {
					allStat.push(statAverage);
				}
				else if (type === 1) {
					allStat.push(statBouvet);
				}
				else if (type === 2) {
					allStat.push(statMale);
				}
				else if (type === 3) {
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
				
				var result = 0;
				var counter = 0;			
				var listLength;

				//In case a new question is added or removed while db is not empty
				listLength = Math.min(currList.length, average.length);

				var i;
				for (i = 0; i < listLength; i++) {
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
			},


			retrieveTypeData : function() {
				typeData = [];
				return $http.get("/getTypeData");
			},


			getTypeData : function() {
				return typeData;
			},

			setTypeData : function(currObject) {
				typeData = [];

				var i;
				for (i= 0 ; i <currObject.length; i++) {

					statObject = {
						questionid: currObject[i]["questionid"],
						mostFreq : currObject[i]["mostFreq"],
						a_ : currObject[i]["a_"],
						b_ : currObject[i]["b_"]
					}
					typeData.push(statObject);
				}
			},





			compareCurrentWithType : function(typeData, currentAnswers) {
				comparisons = [];

				var listLength = Math.min(typeData.length, currentAnswers.length);

				var i;
				for (i=0; i < listLength; i++) {

					var sameAsType = (currentAnswers[i].response === typeData[i].mostFreq)

					statObject = {
						questionid : typeData[i].questionid,
						response : currentAnswers[i].response,
						mostAnswered : sameAsType,
						percentA : typeData[i].a_,
						percentB : typeData[i].b_
					}
					comparisons.push(statObject);
		
				}
				return comparisons;
			},



			/*
			The purpose of this function is to retrieve interesting statistics to present to user
			If user chooses the same answer as the type answer on ALL questions, then this function
			returns the question where the users answer was a part of the biggest majority

			If the user does not choose the same answer as the typical answer, then the function
			will return the question where the user was a part of the smallest minority of answers.

			The function returns an object holding necessary information about answer question and
			percentages, which is used to show results in view.
			*/


			getBiggestDeviation : function(comparisons) {

				//neg variables is the main check. But if no neg variables are found, I retrieve biggest positive deviation to present
				var biggestNegDeviationIndex = -1,
					biggestNegDeviation = 0,
					currentNegDeviation = -1;

				var biggestPosDeviationIndex = -1,
					biggestPosDeviation = 0,
					currentPosDeviation = -1;

				var statObject = []

				var i;
				//Purpously omitting index=0, because statistics male/female is not that interesting
				for (i = 1; i < comparisons.length; i++) {
					
					var typeAnswer = comparisons[i].mostAnswered;
					var userResponse = comparisons[i].response;
					var percentA = comparisons[i].percentA;
					var percentB = comparisons[i].percentB;
					
				
					if (typeAnswer === false) {		
						if (userResponse === 'a') {
							currentNegDeviation = percentB - percentA;	
							if (currentNegDeviation > biggestNegDeviation) {
								biggestNegDeviation = currentNegDeviation;
								biggestNegDeviationIndex = i;
							}
						}
						else if (userResponse === 'b') {
							currentNegDeviation = percentA - percentB;
							if (currentNegDeviation > biggestNegDeviation) {
								biggestNegDeviation = currentNegDeviation;
								biggestNegDeviationIndex = i;
							}
						}
					}


					else if (typeAnswer === true) {		
						if (userResponse === 'a') {
							currentPosDeviation = percentA - percentB;
							if (currentPosDeviation > biggestPosDeviation) {
								biggestPosDeviation = currentPosDeviation;
								biggestPosDeviationIndex = i;
							}
						}
						else if (userResponse === 'b') {
							currentPosDeviation = percentB - percentA;
							if (currentPosDeviation > biggestPosDeviation) {
								biggestPosDeviation = currentPosDeviation;
								biggestPosDeviationIndex = i;
							}
						}
					}
				}

				//Setting object:
				
				var questionid,
					response, 
					mostAnswered,
					percentage;

				if (biggestNegDeviationIndex === -1) {
					//console.log("Finding positive deviation");
					questionid = currentAnswers[biggestPosDeviationIndex].questionid;
					response = currentAnswers[biggestPosDeviationIndex].response;
					mostAnswered = true;
				
					if (response === 'a') {
						percentage = typeData[biggestPosDeviationIndex].a_;
					}
					else if (response === 'b') {
						percentage = typeData[biggestPosDeviationIndex].b_;
					}								
				}

				else {
					//console.log("Finding negative deviation");
					questionid = currentAnswers[biggestNegDeviationIndex].questionid;
					response = currentAnswers[biggestNegDeviationIndex].response;
					mostAnswered = false;

					if (response === 'a') {
						percentage = typeData[biggestNegDeviationIndex].a_;
					}
					else if (response === 'b') {
						percentage = typeData[biggestNegDeviationIndex].b_;
					}					
				}

				statObject = {
						questionid : questionid,
						response : response,
						mostAnswered : mostAnswered,
						percent : percentage
					}
				return statObject;
			}

		};
	})






	//Used to hold editable textfields throughout application
	.service("TextStrings", function() {
		
		var getRegisterAnswerHeader = function() {
			return "Er du sånn eller slik?";
		}

		var getRegisterParticipant1Text = function() {
			return "Hvis du vil være med i trekningen av premien, kan du fylle ut informasjonen under.";
		}

		var getRegisterParticipant2Text = function() {
			return "Informasjonen du har oppgitt vil bli slettet etter trekningen, og vil ikke benyttes av Bouvet til annet formål.";
		}


		var getNumberOfImagesInCarousel = function() {
			return 15;
		}

		var getNumberOfListsTypePerson = function() {
			return 4;
		}

		var getMillisForCarouselSlide = function() {
			return 5000;
		}

		var getMillisForTypePerson = function() {
			return 10000;
		}

		return {
			getRegisterAnswerHeader 		: getRegisterAnswerHeader,
			getRegisterParticipant1Text		: getRegisterParticipant1Text,
			getRegisterParticipant2Text		: getRegisterParticipant2Text,
			getNumberOfImagesInCarousel 	: getNumberOfImagesInCarousel,
			getNumberOfListsTypePerson 		: getNumberOfListsTypePerson,
			getMillisForCarouselSlide		: getMillisForCarouselSlide,
			getMillisForTypePerson			: getMillisForTypePerson
		};
	})


	