'use strict';

myApp.controller('RootController', [
	'$scope',
	'$rootScope',
	'$http',
	'$timeout',
	function($scope, $rootScope, $http, $timeout) {

		$scope.title = 'Teachers page';
		$scope.faculty = false;
		$scope.students = false;
		$scope.progress = false;
}]);


