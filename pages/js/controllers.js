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

		/*TeachersService.query().$promise.then(function (resp) {
			$scope.teachers = resp;
		});*/

		$scope.tableParams = new NgTableParams({
			sorting: {
				name: 'asc'
			}
		}, {
			getData: function (params) {
				var sorting = params.sorting();
				return TeachersService.query(sorting).$promise.then(function (data) {
					params.total(data.inlineCount);
					data = sorting ? $filter('orderBy')(data, params.orderBy()) : data;
					return data;
				});
			}
		});

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
	'$rootScope',
	'$http',
	'$timeout',
	function($scope, $rootScope, $http, $timeout) {

		$scope.title = 'Groups page';

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

