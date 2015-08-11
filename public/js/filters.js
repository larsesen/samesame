"use strict";

/*Filters*/

/*
a filter used to view only a part of the answers,
the input || [] syntax is used to avoid getting errors of undefined array before all data is loaded from the server
*/

angular.module("samesameApp.filters", [])

	.filter("answersFromTo", function() {
		return function(input, start, end) {
			start = +start;
			input = input || [];
			return input.slice(start, end);
		};
	})


// http://stackoverflow.com/questions/18874458/horizontal-ng-repeater-with-new-row-breaks

/*
	.filter("splitImageIntoSublists", function() {
		return function(imageArray, lengthOfSublist) {

			var arrayToReturn = [];
			var subArray = [];

			var pushed = true;

			var i;
			for (i = 0; i < imageArray.length; i++ ) {

				if ((i+1)%lengthOfSublist===0) {
					subArray.push(imageArray[i]);
					arrayToReturn.push(subArray);
					subArray = [];
					pushed = true;
				}
				else {
					subArray.push(imageArray[i]);
					pushed = false;
				}
			}

			if (!pushed)
				arrayToReturn.push(subArray);

			//console.log(JSON.stringify(arrayToReturn));
			return arrayToReturn;
		}
	})
*/
	
