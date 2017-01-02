var dateApp = angular.module('dateApp', 	[ ]);

dateApp.controller('dateAppController',['$scope','$http',function($scope,$http){
	$scope.timeZone = "GMT";
	$scope.offset = 0;
	var originalDate;

	$scope.saveDate = function(){
		var date = new Date($scope.selectedDate);
		$http.post('/dates',{"date":date})
		.then(function(response){
			alert('Date saved successfully...');
			getRecentDate();
		},function(error){
			console.log('Inside error....');
			alert('Please enter correct datetime value.');
			console.log(error);
			console.log(JSON.stringify(error));
	});
	}
	$http.get('/timezones')
		.then(function(response){
			$scope.timezones = response.data;
		},function(error){
			console.log('Inside error....');
			console.log(error)
			console.log(JSON.stringify(error));
	});

	var getRecentDate = function (){
		$http.get('/recentdate')
		.then(function(response){
			if(response.data && response.data.length > 0){
					var date = new Date(response.data[0].date);
					originalDate = date;
					var utcFormat = date.toUTCString();
					$scope.recentDate =utcFormat.substr(0,utcFormat.length - 3) + "GMT";
			}
		},function(error){
			console.log('Inside error....');
			console.log(error)
			console.log(JSON.stringify(error));
	});
	}
	getRecentDate();

	var getConvertedDate = function(offset){
		utc = originalDate.getTime() + (originalDate.getTimezoneOffset() * 60000);
    	convertedDate = new Date(utc + (3600000*(offset)));
		return convertedDate;
	}

	$scope.changeRecentDateTimeZone = function(){
		if(originalDate){
			var convertedDate = getConvertedDate($scope.selectedTimeZone.offset);
			var convertedDateString = convertedDate.toString();
			console.log(convertedDate);
			$scope.recentDate = convertedDateString.replace("GMT+0530 (IST)", $scope.selectedTimeZone.abbr);
		///	$scope.recentDate =convertedDateString.substr(0,convertedDateString.length - 30) + $scope.selectedTimeZone.abbr;

		}else{
			alert("No recent date is saved, please save one to see the timeZone effect.")
		}

	}


}]);
