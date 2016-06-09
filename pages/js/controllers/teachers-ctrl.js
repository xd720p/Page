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
		$scope.teachers = [];
		$scope.formShown = false;
		$scope.teacher = {};

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
			TeachersService.add(teacher).$promise.then(function (resp) {
				$scope.teachers.push(resp);
				$scope.tableParams.reload();
				$scope.teacher = {};
				$scope.formShown = false;
			}, function (err) {
				console.log('Ошибка', err);
				$scope.teacher = {};
				$scope.formShown = false;
			});
		};
}]);