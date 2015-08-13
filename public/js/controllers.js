"use strict";

/*Controllers*/

angular.module("samesameApp.controllers", [])

	//the controller used in the viewing of answers
	.controller("AnswerCtrl", ["$scope", "filterFilter", "Answers", function($scope, filterFilter, Answers) {

		//the number of answers showed in one view
		$scope.limitAnswers = 10;
		//the starting index of the view
		$scope.startAnswers = 0;
	

		//update the index of viewed answers +10
		$scope.tenNextAnswers = function() {
			if ($scope.startAnswers + 10 < $scope.answers.length) {
				$scope.startAnswers += 10;
			}
		};

		//update the index of viewed answers -10
		$scope.tenPrevAnswers = function() {
			if ($scope.startAnswers - 10 >= 0) {
				$scope.startAnswers -= 10;
			}
		};

		//update the index of viewed answers to the last 10
		$scope.tenLastAnswers = function() {
			$scope.startAnswers = $scope.answers.length - lastIndex($scope.answers.length);
		};

		//set the index to the first 10 answers
		$scope.tenFirstAnswers = function() {
			$scope.startAnswers = 0;
		};
		
		//get all answers from the server,
		$scope.getAnswers = function() {
			Answers.getAll().success(function (data) {
				$scope.answers = data;
			});
		};


		//initial call to fetch answers
		$scope.getAnswers();


		
		//deletes all answers and gets all answers again
		$scope.deleteAnswers = function() {
			Answers.deleteAll().success(function () {
				$scope.getAnswers();
			});
		};

		
		//deletes the answer with the specified id and gets all answers again
		$scope.deleteAnswer = function(id) {
			Answers.delete(id).success(function() {
				$scope.getAnswers();
			});
		};


		//helper method for 'tenLastAnswers'
		function lastIndex(length) {
			var mod = length % 10;
			if (mod === 0) {
				return 10;
			}
			else {
				return mod;
			}
		}

		$scope.exportAnswers = function() {
			Answers.export().success(function() {
			});
		};
	}])



	//the controller used in the viewing of participants
	.controller("ParticipantsCtrl", ["$scope", "filterFilter", "Participants", function($scope, filterFilter, Participants) {

		//initial fetching of participants and updates the list of winners
		Participants.getAll().success(function (data) {
			$scope.participants = data;
			getWinners();
		});

		//index of view
		$scope.startParticipants = 0;
		//number of participants showed in the view
		$scope.limitParticipants = 10;

		//deletes all participants and fetches the participants again
		$scope.deleteParticipants = function() {
			Participants.deleteAll().success(function () {
				Participants.getAll().success(function (data) {
					$scope.participants = data;
				});
			});
		};

		/*
		Used to pick a winner.
		Finds a winner from the list of participants and checks whether the winner already is a winner.
		If so, it picks a new winner recursively.
		If not it marks the participant as a winner, gets all participants again, and updates the list of winners
		*/
		$scope.pickWinner = function() {
			if ($scope.winners.length < $scope.participants.length) {
				var winnerIndex = Math.floor(Math.random() * $scope.participants.length);
				var winnerEmail = $scope.participants[winnerIndex].email;
				if (winnerAlreadyExists(winnerEmail)) {
					$scope.pickWinner();
				}
				else {
					Participants.updateWinner(winnerEmail).success(function () {
						Participants.getAll().success(function (data) {
							$scope.participants = data;
							getWinners();
						});
					});
				}
			}
		};

		//helper method for 'pickWinner', checks if the email passed in is the email of any participant already in the list of winners
		function winnerAlreadyExists (winnerEmail) {
			var i;
			for (i = 0; i< $scope.winners.length; i++) {
				if ($scope.winners[i].email === winnerEmail) {
					return true;
				}
			}
				return false;
		}

		//sets the list of winners
		function getWinners() {
			$scope.winners = filterFilter($scope.participants, {winner : 1});
		}

		//deletes all winners and gets all participants again, since the list of winners is a filtered version of the list of participants
		$scope.deleteWinners = function() {
			Participants.deleteWinners().success(function () {
				Participants.getAll().success(function(data) {
					$scope.participants = data;
					getWinners();
				});
			});
		};

		//updates the index of the viewing of participants +10
		$scope.tenNextParticipants = function() {
			if ($scope.startParticipants + 10 < $scope.participants.length) {
				$scope.startParticipants += 10;
			}
		};

		//updates the index of the viewing of participants -10
		$scope.tenPrevParticipants = function() {
			if ($scope.startParticipants - 10 >= 0) {
				$scope.startParticipants -= 10;
			}
		};

		//updates the index to the last 10 participants
		$scope.tenLastParticipants = function() {
			$scope.startParticipants = $scope.participants.length - lastIndex($scope.participants.length);
		};

		//updates the index to the first participants
		$scope.tenFirstParticipants = function() {
			$scope.startParticipants = 0;
		};

		//helper method of 'tenLastParticipants'
		function lastIndex(length) {
			var mod = length % 10;
			if (mod === 0) {
				return 10;
			}
			else {
				return mod;
			}
		}

		function exportParticipants() {
			Participants.export().success(function() {
			});
		}

	}])








	.controller("RegisterGenderCtrl", ["$scope", "$interval", "$location", "TextStrings", "AnsweredQuestions", "Questions", "Answers", "RecentAnswer", "UserIDService", function($scope, $interval, $location, TextStrings, AnsweredQuestions, Questions, Answers, RecentAnswer, UserIDService) {

		
		$scope.registerAnswerHeader = TextStrings.getRegisterAnswerHeader();


		//maintains total number of questions
		var numberOfQuestions = Object.keys(Questions).length;

		//Setting variables used throughout questionnaire
		var questionid = 0;
		var gender;
		var userid = JSON.stringify(UserIDService.getUserID());
		var answeredQuestions = AnsweredQuestions.initAnsweredQuestions(numberOfQuestions);


		//Needed for retrieving images correctly at init stage
		AnsweredQuestions.removeIndex(answeredQuestions,questionid);
		$scope.nextQ = questionid;
		$scope.answeredQuestions = answeredQuestions;



		$scope.nextQuestion = function(response,radio) {

			$interval(function() {

				if (response === 'a') {
					gender = 'm';
				}
				else if (response === 'b') {
					gender = 'f';
				}
				
				UserIDService.setGender(gender);
			
				//Creating JSON object used to send to db
				var dataJSON = { "userid" : userid, "questionid" : questionid, "response" : response, "gender": gender  };
				//console.log("dataJSON: " + JSON.stringify(dataJSON));  

				 Answers.create(dataJSON)
				.success(function(data) {
					console.log("answer registered" + JSON.stringify(dataJSON));
					RecentAnswer.setAnswer(dataJSON);

					$location.path("/partial-register-answer");				
				});
			//}, 150, 1);
			}, 0, 1);
		};
	}])






	//the controller used on the page where the user registers answers
	.controller("RegisterAnswerCtrl", ["$scope", "$location", "$interval", "Answers", "Questions", "RecentAnswer","AnsweredQuestions", "UserIDService","TextStrings", function($scope, $location, $interval, Answers, Questions, RecentAnswer, AnsweredQuestions, UserIDService, TextStrings) {

		
		$scope.registerAnswerHeader = TextStrings.getRegisterAnswerHeader();


		
		//Generates random number within range to select first question
		var nextQ = getRandomInt(1, Object.keys(Questions).length);

		


		//Setting variables used throughout questionnaire
		var answeredQuestions = AnsweredQuestions.getAnsweredQuestions();
		var userid = JSON.stringify(UserIDService.getUserID());
		
	
		 
		//Needed for retrieving images correctly at init stage
		AnsweredQuestions.removeIndex(answeredQuestions,nextQ);
		$scope.nextQ = nextQ;
		//$scope.answeredQuestions = answeredQuestions;



		$scope.nextQuestion = function(response,radio) {

			//$interval(function() {

				answeredQuestions = AnsweredQuestions.getAnsweredQuestions();
				var listEmpty = isListEmpty(answeredQuestions);

				var questionid = $scope.nextQ;
				var gender = UserIDService.getGender();
			
				//Creating JSON object used to send to db
				var dataJSON = { "userid" : userid, "questionid" : questionid, "response" : response, "gender": gender  };
				//console.log("dataJSON: " + JSON.stringify(dataJSON));  

				 Answers.create(dataJSON)
				.success(function(data) {
					console.log("answer registered" + JSON.stringify(dataJSON));
					RecentAnswer.setAnswer(dataJSON);

					//Updating with next image, iff there are more images.
					if (!listEmpty) {
						var nextQ = AnsweredQuestions.getNextQuestion(answeredQuestions);
						//console.log("question number: " + nextQ); 
						AnsweredQuestions.removeIndex(answeredQuestions,nextQ);	
						$scope.nextQ = nextQ; 
						$location.path("/partial-register-answer");	
					}
					else {
						$location.path("/partial-view-results");
					}
				});
			//}, 50, 1);
			$scope.questions = Questions.questions;
		};
	}])






	//the controller used on the page where the user registers the contact info
	.controller("RegisterParticipantCtrl", ["$scope", "$location", "Participants", "UserIDService", "Statistics", "TextStrings", function($scope, $location, Participants, UserIDService, Statistics, TextStrings) {

		
		$scope.participant1Text = TextStrings.getRegisterParticipant1Text();
		$scope.participant2Text = TextStrings.getRegisterParticipant2Text();

		//initial object of participant
		$scope.participant = {};
		//the initial field of duplicate contact info0
		$scope.duplicateEmail = "";
	
	
		//a setter for the duplicate email field
		$scope.setDuplicateEmail = function() {
			$scope.duplicateEmail = $scope.participant.email;
		};

		/*
		Used to submit the participant object.
		If no error is received, we are relocated to the next page
		If an error is detected and the status is 400, it's set by the server due to duplicate entry of the primary key (email)
		Sets the attempted email as duplicated, which in turn is used to inform the user
		*/
		$scope.submitParticipant = function() {
			var bouvet;
			//console.log(JSON.stringify($scope.participant));

			if (isBouvetEmployee($scope.participant.email)) {
				bouvet = 1;
			}
			else {
				bouvet = 0;
			}

			var userid = UserIDService.getUserID();
		

			//Creating JSON object used to send to db
			var dataJSON = { "userid": userid, "name": $scope.participant.name, "email": $scope.participant.email, "prize":$scope.participant.prize, "bouvet": bouvet};


			Participants.create(dataJSON)
			.success(function(data){
				console.log("participant registered" + JSON.stringify(dataJSON));
				$location.path("/partial-participant-registered");
			})
			.error(function(data, status) {
				if (status === 400) {
					$scope.setDuplicateEmail();
				}
			});
		};

	}])
	





	// Inits a unique user id. Used for db interaction for a single user
	.controller("InitUserCtrl", ["$scope", "$location", "UserIDService", "TextStrings", function($scope, $location, UserIDService, TextStrings) {	
		
		var d = new Date();
		var id = d.getTime();

		UserIDService.setUserID(id);
		$location.path("/partial-start");
	}])




	.controller("StatisticsTypePersonCtrl", ["$scope", "$interval", "$location", "Statistics", "TextStrings", function($scope, $interval, $location, Statistics, TextStrings) {

		
		var pairs;


		//Retrieves data for the type parameter
		var retrieveStatistics = function(type, cb) {
			Statistics.resetStatistics();		
			//initial call to fetch answers
			Statistics.retrieveStatistics(type).success(function(data) {
				var statistics = data;		
				// sets objectlist
				Statistics.setStatistics(statistics,type);

				if (cb) {
					cb(Statistics.getStatistics(type), type);
				}
			});
		}


		var retrieveAllStatistics = function(cb) {
			var count = 4;
			var data = [];
			var allDone = function(partial, index) {
				count = count - 1;
				data[index] = partial;
				if (count === 0) {
					cb(data);
				}
			}
			retrieveStatistics(0, allDone);
			retrieveStatistics(1, allDone);
			retrieveStatistics(2, allDone);
			retrieveStatistics(3, allDone);
		}

		//Following variables used for stat-carousel
		var initList = function() {
			var pairs = [
			Statistics.getStatistics(0),
			Statistics.getStatistics(1),
			Statistics.getStatistics(2),
			Statistics.getStatistics(3)
			]
			return pairs;
		}


		//Administers freshness of typical person lists
		var getNextListForTypePerson = function(cb) {
	
			retrieveAllStatistics(function(allData) {

				var activeList = allData[currentList],
				lengthOfSublist = 3,
				arrayToReturn = [],
				subArray = [];

				var pushed = true;

				var i;
				for (i = 0; i < activeList.length ; i++ ) {				
					if ((i+1) % lengthOfSublist === 0) {
						subArray.push(activeList[i]);
						arrayToReturn.push(subArray);
						subArray = [];
						pushed = true;
					}
					else {
						subArray.push(activeList[i]);
						pushed = false;
					}
				}
				if (!pushed) {
					arrayToReturn.push(subArray);
				}
				$scope.activeList = arrayToReturn;
				$scope.listname = getListname(currentList);

				if (currentList === allData.length-1) {
					currentList = 0;
				}
				else {
					currentList ++;
				}

				cb();

			});
		};


		var getListname = function(index) {
			if (index === 0) {
				return "Javazonedeltakeren";
			}
			else if (index === 1) {
				return "Bouvetansatte";
			}
			else if (index === 2) {
				return "mannen";
			}
			else if (index === 3) {
				return "kvinnen";
			}
		} 

		
		pairs = initList();

		
		
		$scope.allData = Statistics.getAllStats(); //allData used in partial-stat-table
		$scope.counts = Statistics.getCounts(); //Used in view partial-stat-table to access number of answered questions for each type.



		//Exposure
		var currentCollectionId = 0, currentImageId = 0;
		var currentList = 0;

		var activeObject;

		var setCurrentImageObject = function() {
			//setListName(currentCollectionId);
			$scope.activeObject = pairs[currentCollectionId][currentImageId];
		}

		$scope.getCurrentImage = function(suffix) {
			
			setCurrentImageObject();

			//To initially set image while waiting for Angular
			if(!pairs[currentCollectionId][currentImageId]) {
				return "loading.png";
			}

			$scope.dataList = pairs[currentCollectionId];
			
			//Each of following scope variables, corresponds to each progress bar in partial-stat-carousel
			$scope.allList = pairs[0][currentImageId];
			$scope.bouvetList = pairs[1][currentImageId];
			$scope.maleList = pairs[2][currentImageId];
			$scope.femaleList = pairs[3][currentImageId];

			return pairs[currentCollectionId][currentImageId].questionid + suffix + '.png';
		}



		var getNextImageForCarousel = function(cb) {
			
			if(currentImageId === pairs[currentCollectionId].length - 1) { //if end of the current collection
				//console.log("End of list");

				var nextCollectionId;
				if (currentCollectionId === pairs.length - 1) {
					nextCollectionId = 0;
				}
				else {
					nextCollectionId = currentCollectionId + 1;
				}

				retrieveStatistics(nextCollectionId, function(imagePairList) {
					currentImageId = 0;
					currentCollectionId = nextCollectionId;
					pairs[nextCollectionId] = imagePairList;
					cb();
				});
			} 
			else {
				currentImageId = currentImageId + 1;
				cb();
			}
		}	




		var count = TextStrings.getNumberOfListsTypePerson();

		var handleInterval = function() {
			
			if ($location.path() === "/partial-stat-typePerson") {
				if (count === 0) {
					$location.path("/partial-stat-carousel");
				} else {	
					getNextListForTypePerson(function() {
						$interval(handleInterval, TextStrings.getMillisForTypePerson(),1);
					});
				}
			}
			count = count - 1;
		};

		handleInterval();


	}])






	.controller("StatisticsCarouselCtrl", ["$scope", "$interval", "$location", "Statistics", "TextStrings", function($scope, $interval, $location, Statistics, TextStrings) {

		var pairs = [];


		//Retrieves data for the type parameter
		var retrieveStatistics = function(type, cb) {
			Statistics.resetStatistics();		
			//initial call to fetch answers
			Statistics.retrieveStatistics(type).success(function(data) {
				var statistics = data;		
				// sets objectlist
				Statistics.setStatistics(statistics,type);

				if (cb) {
					cb(Statistics.getStatistics(type), type);
				}
			});
		}


		var retrieveAllStatistics = function(cb) {
			var count = 4;
			var data = [];
			var allDone = function(partial, index) {
				count = count - 1;
				data[index] = partial;
			
			}
			retrieveStatistics(0, allDone);
			retrieveStatistics(1, allDone);
			retrieveStatistics(2, allDone);
			retrieveStatistics(3, allDone);
		}

		//Following variables used for stat-carousel
		var initList = function() {
			var pairs = [
			Statistics.getStatistics(0),
			Statistics.getStatistics(1),
			Statistics.getStatistics(2),
			Statistics.getStatistics(3)
			]
			return pairs;
		}




		//Exposure
		var currentCollectionId = 0, currentImageId = 0;
		var currentList = 0;

		var activeObject;

		var setCurrentImageObject = function() {
			//setListName(currentCollectionId);
			$scope.activeObject = pairs[currentCollectionId][currentImageId];
		}

		$scope.getCurrentImage = function(suffix) {
			
			setCurrentImageObject();

			//To initially set image while waiting for Angular
			if(!pairs[currentCollectionId][currentImageId]) {
				return "loading.png";
			}

			$scope.dataList = pairs[currentCollectionId];
			
			//Each of following scope variables, corresponds to each progress bar in partial-stat-carousel
			$scope.allList = pairs[0][currentImageId];
			$scope.bouvetList = pairs[1][currentImageId];
			$scope.maleList = pairs[2][currentImageId];
			$scope.femaleList = pairs[3][currentImageId];

			return pairs[currentCollectionId][currentImageId].questionid + suffix + '.png';
		}




		retrieveAllStatistics();
		pairs = initList();

		
		
		$scope.allData = Statistics.getAllStats(); //allData used in partial-stat-table
		$scope.counts = Statistics.getCounts(); //Used in view partial-stat-table to access number of answered questions for each type.




		var getNextImageForCarousel = function(cb) {
			
			if(currentImageId === pairs[currentCollectionId].length - 1) { //if end of the current collection
				//console.log("End of list");

				var nextCollectionId;
				if (currentCollectionId === pairs.length - 1) {
					nextCollectionId = 0;
				}
				else {
					nextCollectionId = currentCollectionId + 1;
				}

				retrieveStatistics(nextCollectionId, function(imagePairList) {
					currentImageId = 0;
					currentCollectionId = nextCollectionId;
					pairs[nextCollectionId] = imagePairList;
					cb();
				});
			} 
			else {
				currentImageId = currentImageId + 1;
				cb();
			}
		}	




		var count = TextStrings.getNumberOfImagesInCarousel();
		var handleInterval = function() {
			if ($location.path() === "/partial-stat-carousel") {
				if (count === 0) {
					$location.path("/partial-stat-typePerson");
				} else {
					getNextImageForCarousel(function() {
						$interval(handleInterval, TextStrings.getMillisForCarouselSlide(), 1);
					});
				}
			}		
			count = count - 1;
		};

		handleInterval();


	}])






































	.controller("StatisticsTableCtrl", ["$scope", "Statistics", "TextStrings", function($scope, Statistics, TextStrings) {

		//Retrieves data for the type parameter specified
		var retrieveStatistics = function(type, cb) {
			Statistics.resetStatistics();		
			//initial call to fetch answers
			Statistics.retrieveStatistics(type).success(function(data) {
				var statistics = data;		
				// sets objectlist
				Statistics.setStatistics(statistics,type);

				if (cb) {
					cb(Statistics.getStatistics(type), type);
				}
			});
		}


		var retrieveAllStatistics = function(cb) {
			var count = 4;
			var data = [];
			var allDone = function(partial, index) {
				count = count - 1;
				data[index] = partial;
			}
			retrieveStatistics(0, allDone);
			retrieveStatistics(1, allDone);
			retrieveStatistics(2, allDone);
			retrieveStatistics(3, allDone);
		}


		//Retrieves number of answered questions for each type. 
		var retrieveCounts = function() {
			Statistics.resetCounts;
			Statistics.retrieveCounts().success(function(data) {
				var statistics = data;
				Statistics.setCounts(statistics);
			});
		}


		retrieveAllStatistics();
		retrieveCounts();
		
		$scope.allData = Statistics.getAllStats(); //allData used in partial-stat-table
		$scope.counts = Statistics.getCounts(); //Used in view partial-stat-table to access number of answered questions for each type.

		}])






	.controller("StatisticsCompareCtrl", ["$scope", "$interval", "Statistics", "TextStrings", "UserIDService", function($scope, $interval, Statistics, TextStrings, UserIDService) {

		



		var retrieveStatistics = function(type, cb) {
			Statistics.resetStatistics();		
			//initial call to fetch answers
			Statistics.retrieveStatistics(type).success(function(data) {
				var statistics = data;		
				// sets objectlist
				Statistics.setStatistics(statistics,type);

				$scope.currentAnswers = Statistics.getCurrentAnswers(UserIDService.getUserID);
				if (cb) {
					cb(Statistics.getStatistics(type));
				}

				Statistics.compareAnswers(Statistics.getStatistics(type), Statistics.getCurrentAnswers(UserIDService.getUserID()));
			});
		}

		var retrieveAllStatistics = function(cb) {
			retrieveStatistics(0);
			retrieveStatistics(1);
			retrieveStatistics(2);
			retrieveStatistics(3);
		}


		var getCurrentAnswers = function() {
			Statistics.retrieveCurrentAnswers(UserIDService.getUserID()).success(function(data) {	
			Statistics.setCurrentAnswers(data);
			});
		}


		getCurrentAnswers(UserIDService.getUserID);
		retrieveAllStatistics();

		$scope.resultDispatcher = {
			_resultObject: null,
			getImage: function() {
				console.log(this._resultObject)
				if (this._resultObject) {
					return this._resultObject.questionid + this._resultObject.response;
				} else {
					return 'loading';
				}
			},
			getPercent: function() {
				if (this._resultObject) {
					return this._resultObject.percent;
				} else {
					return '???';
				}
			}
		};	
		
		var retrieveTypeData = function(type) {
			Statistics.resetStatistics();		
			//initial call to fetch answers
			Statistics.retrieveTypeData().success(function(data) {
				var statistics = data;		
				// sets objectlist
				Statistics.setTypeData(statistics);

				var comparisons = Statistics.compareCurrentWithType(Statistics.getTypeData(), $scope.currentAnswers);
				
				$scope.resultDispatcher._resultObject = Statistics.getBiggestDeviation(comparisons);
			});
		}

		retrieveTypeData();
	}])

	







function isListEmpty(list) {
		var i;
		for (i = 0; i < list.length; i++) {
			if (list[i] != null) {
				return false;
			}	
		}
		return true;
	}




function isBouvetEmployee(email) {
	var mail = email.split("@");
	var domain = mail[1];
	return (domain === "bouvet.no");
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}