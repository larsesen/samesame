"use strict";

/*Controllers*/

angular.module("samesameApp.controllers", [])

	//the controller used in the viewing of answers
	.controller("AnswerCtrl", ["$scope", "filterFilter", "Answers", function($scope, filterFilter, Answers) {

		//the number of answers showed in one view
		$scope.limitAnswers = 10;
		//the starting index of the view
		$scope.startAnswers = 0;
		//a boolean deciding whether to view all answers or only unprocessed
		$scope.viewAll = true;

		//toggle the viewAll field and fetch data again to reflect the change
		$scope.toggleViewAll = function() {
			if ($scope.viewAll) {
				$scope.viewAll = false;
			}
			else {
				$scope.viewAll = true;
			}
			$scope.tenFirstAnswers();
			$scope.getAnswers();
		};

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

		//find the number of unprocessed answers
		$scope.setNumberOfUnprocessed = function() {
			$scope.numberOfUnprocessed = filterFilter($scope.answers, {processed : 0}).length;
		};
		
		/*
		get all answers from the server,
		uses the boolean 'viewAll' and also updates the number of unprocessed answers
		*/
		$scope.getAnswers = function() {
			Answers.getAll($scope.viewAll).success(function (data) {
					$scope.answers = data;
					$scope.setNumberOfUnprocessed();
			});
		};

		//initial call to fetch answers
		$scope.getAnswers();

		/*
		get the answer with the id specified.
		the answer is returned in an array from the server, so to get the answer we are looking for we use data[0]
		locks the answer if it's unlocked
		used when viewing a specific answer when the user presses 'behandle svar'
		*/
		$scope.getAnswer = function(id) {
			Answers.get(id).success(function (data) {
				$scope.oneAnswer = data[0];
				if (data[0].locked === 0) {
					Answers.toggleLock(id);
				}
			});
		};

		/*
		used when the user presses 'merk som behandlet/ubehandlet'
		changes the status of the answer with the id specified,
		unlocks and changes the status of the 'processed' field, and finally gets all answers
		*/
		$scope.updateStatus = function(id) {
			Answers.toggleLock(id).success(function() {
				Answers.update(id).success(function() {
					$scope.getAnswers();
				});
			});
		};
		
		/*
		used when the user closes the dialog,
		unlocks the answer and fetches all answers again
		*/
		$scope.closeAndUnlock = function(id) {
			Answers.toggleLock(id).success(function() {
				$scope.getAnswers();
			});
		};

		/*
		deletes all answers and gets all answers again
		*/
		$scope.deleteAnswers = function() {
			Answers.deleteAll().success(function () {
				$scope.getAnswers();
			});
		};

		/*
		deletes the answer with the specified id and gets all answers again
		*/
		$scope.deleteAnswer = function(id) {
			Answers.delete(id).success(function() {
				$scope.getAnswers();
			});
		};

		/*
		uses a filter to get only unprocessed answers, selects the first elemet,
		and checks the index of that element in the original array.
		then finds the appropriate index, and updates the index
		*/
		$scope.findNextUnprocessed = function() {
			var nextUnprocessed = $scope.answers.indexOf(filterFilter($scope.answers, {processed : 0})[0]);
			var roundedIndex = roundIndex(nextUnprocessed);
			$scope.startAnswers = roundedIndex;

		};

		/*
		helper method for 'findeNextUnprocessed'
		*/
		function roundIndex(index) {
			return index - (index % 10);
		}

		/*
		helper method for 'tenLastAnswers'
		*/
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



	//the controller used on the page where the user registers answers
	.controller("RegisterAnswerCtrl", ["$scope", "$location", "Answers", "Questions", "RecentAnswer","AnsweredQuestions", "UserIDService", function($scope, $location, Answers, Questions, RecentAnswer, AnsweredQuestions, UserIDService) {

		var nextQ = 1;
		var sex;

		//boolean determining whether the user has already attempted to submit
		$scope.submitted = false;

		//maintains total number of questions
		$scope.numberOfQuestions = Object.keys(Questions).length;

		//Setting variables used throughout questionnaire
		var answeredQuestions = AnsweredQuestions.initAnsweredQuestions($scope.numberOfQuestions);
		var userid = JSON.stringify(UserIDService.getUserID());
		
	
		 
		//Needed for retrieving images correctly at init stage
		AnsweredQuestions.removeIndex(answeredQuestions,nextQ);
		$scope.nextQ = nextQ;
		$scope.answeredQuestions = answeredQuestions;


		$scope.nextQuestion = function(response) {

			answeredQuestions = AnsweredQuestions.getAnsweredQuestions();
			var listEmpty = isListEmpty(answeredQuestions);
			$scope.answeredQuestions = answeredQuestions; // used for printing to view

			//Checks how many elements left. Used for routing request correctly
			var elementsLeft = elementsLeftInList(answeredQuestions);
			var questionid = $scope.nextQ;


			if (questionid == 1) {
				if (response === 'a') {
					sex = 'm';
				}
				else if (response === 'b') {
					sex = 'f';
				}
			}
		

			//Creating JSON object used to send to db
			var dataJSON = { "userid" : userid, "questionid" : questionid, "response" : response, "sex": sex  };
			//console.log("dataJSON: " + JSON.stringify(dataJSON));  

			 Answers.create(dataJSON)
			.success(function(data) {
				console.log("answer registered" + JSON.stringify(dataJSON));
				RecentAnswer.setAnswer(dataJSON);

				/*
				Updating with next image, if there are more images.
				*/
				if (!listEmpty) {
					var nextQ = AnsweredQuestions.getNextQuestion(answeredQuestions);
					//console.log("question number: " + nextQ); 
					AnsweredQuestions.removeIndex(answeredQuestions,nextQ);	
					$scope.nextQ = nextQ; 
				}

				if (elementsLeft > 0) {
					$location.path("/partial-register-answer");				
				}
				else {
					$location.path("/partial-register-participant");
				}

			});
		};
		$scope.questions = Questions.questions;
	}])






	//the controller used on the page where the user registers the contact info
	.controller("RegisterParticipantCtrl", ["$scope", "$location", "Participants", "UserIDService", function($scope, $location, Participants, UserIDService) {

		//initial object of participant
		$scope.participant = {};
		//the initial field of duplicate contact info0
		$scope.duplicateEmail = "";
	
		//retrieving userid to insert to db, so that answer is linked to specific person
		$scope.userid = UserIDService.getUserID();
		$scope.participant.userid = $scope.userid;



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
			console.log(JSON.stringify($scope.participant));

			if (isBouvetEmployee($scope.participant.email)) {
				$scope.participant.bouvet = 1;
			}
			else {
				$scope.participant.bouvet = 0;
			}

			Participants.create($scope.participant)
			.success(function(data){
				$location.path("/partial-participant-registered");
			})
			.error(function(data, status) {
				if (status === 400) {
					$scope.setDuplicateEmail();
				}
			});
		};
	}])
	





	.controller("VisualizeCtrl", ["$scope", "Answers", "Questions", function($scope, Answers, Questions) {
		/*
		get all answers from the server,
		always returns all answers
		*/
		$scope.getAnswers = function() {
			Answers.getAll(true).success(function (data) {
					$scope.answers = data;
					$scope.$broadcast('draw');
			});
		};

		$scope.getAnswers();
		$scope.questions = Questions.questions;
		
	}])

	.controller("VisualizeSingleCtrl", ["$scope", "RecentAnswer", "Questions", function($scope, RecentAnswer, Questions) {
		$scope.questions = Questions.questions;		
		
		$scope.getAnswers = function() {
			$scope.answers = [RecentAnswer.getAnswer()];
			var millisecondsToWait = 100;
			setTimeout(function() {
			    $scope.$broadcast('draw');		
			}, millisecondsToWait);	
		}
		
		$scope.broadcasted = true;
		$scope.getAnswers();

	}])





	// Inits a unique user id. Used for db interaction for a single user
	.controller("InitUserCtrl", ["$scope", "$location", "UserIDService", function($scope, $location, UserIDService) {	
		var d = new Date();
		var id = d.getTime();

		UserIDService.setUserID(id);
		$location.path("/partial-start");
	}])




	.controller("StatisticsCtrl", ["$scope", "Statistics", function($scope, Statistics) {


		$scope.retrieveStatistics = function(type) {
			
			$scope.allData = []; 
			Statistics.resetStatistics();
			
			//initial call to fetch answers
			Statistics.retrieveStatistics(type).success(function(data) {
				$scope.statistics = data;
			
				// sets objectlist
				Statistics.setStatistics($scope.statistics,type);
			});
		}

		$scope.retrieveCounts = function() {
			$scope.counts = [];
			Statistics.resetCounts;

			Statistics.retrieveCounts().success(function(data) {
				$scope.statistics = data;

				Statistics.setCounts($scope.statistics);
			});
		}


		//possible to easily add more type of users if necessary:
		$scope.retrieveStatistics(1);
		$scope.retrieveStatistics(2);
		$scope.retrieveStatistics(3);
		$scope.retrieveStatistics(4);

		$scope.retrieveCounts();

		$scope.allData = Statistics.getAllStats(); //Used in view to access variables
		$scope.counts = Statistics.getCounts(); //Used in view to access variables
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


function elementsLeftInList(list) {
	var counter = 0;
	var i;

	for (i = 0 ; i < list.length ; i++) {
		if (list[i] == null) {
			counter++;
		}
	}
	return (list.length - counter);
}



function isBouvetEmployee(email) {
	var mail = email.split("@");
	var domain = mail[1];
	return (domain === "bouvet.no");
}

