var dateApp = angular.module('dateApp', 	[ ]);

dateApp.controller('dateAppController',['$scope',function($scope){
	$scope.recentlySelectedDate = {
		"date":"2017-05-10",
		"abbr":"IST"
	}
	$scope.showDate = function(){
		console.log(typeof $scope.selectedDate);
		alert($scope.selectedDate)
		var date = new Date($scope.selectedDate);
		alert(date.toGMTString());
	}
	
}]);