"use strict";

/*Main app*/

/*
The dependencies used in the app are defined, and the route functionality of angular is set up.
Defines which html file to return in 'templateUrl' and the associated controller if it exists
*/
angular.module("samesameApp", [
	"ngRoute",
	"samesameApp.controllers",
	"samesameApp.directives",
	"samesameApp.services",
	"samesameApp.filters"
	]).
config(["$routeProvider", function($routeProvider) {
	$routeProvider.when("/partial-index", 
		{
			templateUrl: "views/new_partial-index.html"
		});
	$routeProvider.when("/partial-start", 
		{
			templateUrl: "views/new_partial-start.html", controller: "InitUserCtrl"
		});
	$routeProvider.when("/partial-register-answer", 
		{
			templateUrl: "views/new_partial-register-answer.html", controller: "RegisterAnswerCtrl"
		});


	$routeProvider.when("/partial-register-participant", 
		{
			templateUrl: "views/new_partial-register-participant.html", controller: "RegisterParticipantCtrl"
		});

	$routeProvider.when("/partial-participant-registered", 
		{
			templateUrl: "views/new_partial-participant-registered.html", controller: "RegisterParticipantCtrl"
		});






	$routeProvider.when("/partial-view-answers", 
		{
			templateUrl: "views/new_partial-view-answers.html", controller: "AnswerCtrl"
		});

	$routeProvider.when("/partial-view-participants", 
		{
			templateUrl: "views/partial-view-participants.html", controller: "ParticipantsCtrl"
		});









	



	
	$routeProvider.when("/visualize", 
		{
			templateUrl: "views/partial-view-answersvisual.html", controller: "VisualizeCtrl"
		});
	$routeProvider.when("/visualize-single", 
		{
			templateUrl: "views/partial-view-answersvisual-single.html", controller: "VisualizeSingleCtrl"
		});
	$routeProvider.otherwise({redirectTo: "/partial-index"});
}]);