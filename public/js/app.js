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
	"samesameApp.filters",
	"angular-carousel",
	"ui.bootstrap"
	]).

config(["$routeProvider", function($routeProvider) {
	$routeProvider.when("/partial-index", 
		{
			templateUrl: "views/partial-index.html"
		});
	$routeProvider.when("/partial-start", 
		{
			templateUrl: "views/partial-start.html", controller: "InitUserCtrl"
		});
	$routeProvider.when("/partial-register-answer", 
		{
			templateUrl: "views/partial-register-answer.html", controller: "RegisterAnswerCtrl"
		});


	$routeProvider.when("/partial-register-participant", 
		{
			templateUrl: "views/partial-register-participant.html", controller: "RegisterParticipantCtrl"
		});

	$routeProvider.when("/partial-participant-registered", 
		{
			templateUrl: "views/partial-participant-registered.html", controller: "RegisterParticipantCtrl"
		});

	$routeProvider.when("/partial-view-answers", 
		{
			templateUrl: "views/partial-view-answers.html", controller: "AnswerCtrl"
		});

	$routeProvider.when("/partial-view-participants", 
		{
			templateUrl: "views/partial-view-participants.html", controller: "ParticipantsCtrl"
		});

/* ============================================================
Stats views
=============================================================*/

	$routeProvider.when("/partial-stat-overview", 
		{
			templateUrl: "views/partial-stat-overview.html"
		});

	$routeProvider.when("/partial-stat-table",
		{
			templateUrl: "views/partial-stat-table.html", controller: "StatisticsCtrl"
		});



	$routeProvider.when("/partial-stat-average",
		{
			templateUrl: "views/partial-stat-average.html", controller: "StatisticsCtrl"
		});

	$routeProvider.when("/partial-stat-generateAverage",
		{
			templateUrl: "views/partial-stat-generateAverage.html", controller: "StatisticsCtrl",
		});



	$routeProvider.when("/partial-stat-imagepairs",
		{
			templateUrl: "views/partial-stat-imagepairs.html", controller: "StatisticsCtrl"
		});


	$routeProvider.when("/partial-stat-carousel",
	{
		templateUrl: "views/partial-stat-carousel.html", controller: "StatisticsCtrl"
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