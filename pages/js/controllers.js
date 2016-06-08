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

myApp.controller('TeachersController', [
	'$scope',
	'$filter',
	'TeachersService',
	'$rootScope',
	'$http',
	'$timeout',
		'NgTableParams',
	function($scope, $filter, TeachersService, $rootScope, $http, $timeout, NgTableParams) {

		$scope.title = 'Преподаватели';
		$scope.table = {};
		$scope.teachers = [];
		$scope.formShown = false;



		TeachersService.query().$promise.then(function (resp) {
			$scope.teachers = resp;

			$scope.tableParams = new NgTableParams({
				sorting: {
					name: 'asc'
				},
				filter: { name: ''}
			}, { dataset: $scope.teachers}
			);
		});

		$scope.addTeacher = function (teacher) {
			TeachersService.save(teacher).$promise.then(function (resp) {
					$scope.teachers.push(resp);
					$scope.tableParams.reload();
					console.log($scope.teachers);

			}, function (err) {
				console.log('Ошибка', err);
			});
		};
		console.log($scope.teachers);


}]);

myApp.controller('DisciplinesController', [
	'$scope',
	'$rootScope',
	'$http',
	'$timeout',
	function($scope, $rootScope, $http, $timeout) {

		$scope.title = 'Disciplines page';

}]);

myApp.controller('GroupsController', [
	'$scope',
		'GroupService',
	'$rootScope',
	'$http',
	'$timeout',
	function($scope, GroupService, $rootScope, $http, $timeout) {

		$scope.title = 'Groups page';
		GroupService.query().$promise.then(function (resp) {
			$scope.groups = resp;
		});

}]);

myApp.controller('NormsController', [
	'$scope',
	'$rootScope',
	'$http',
	'$timeout',
	function($scope, $rootScope, $http, $timeout) {

		$scope.title = 'Norms page';

}]);

myApp.controller('NormPassController', [
	'$scope',
	'$rootScope',
	'$http',
	'$timeout',
	function($scope, $rootScope, $http, $timeout) {

		$scope.title = 'NormsPass page';

}]);

myApp.controller('StudentDateController', [
	'$scope',
	'$rootScope',
	'$http',
	'$timeout',
	function($scope, $rootScope, $http, $timeout) {

		$scope.title = 'StudentDate page';

}]);

