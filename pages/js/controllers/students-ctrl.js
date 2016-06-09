myApp.controller('StudentsController', [
	'$scope',
	'$filter',
	'StudentsService',
	'$rootScope',
	'$http',
	'$timeout',
	'NgTableParams',
	function($scope, $filter, StudentsService, $rootScope, $http, $timeout, NgTableParams) {

		$scope.title = 'Студенты';
		$scope.students = [];
		$scope.formShown = false;
		$scope.student = {};

		StudentsService.query().$promise.then(function (resp) {
			$scope.students = resp;

			$scope.tableParams = new NgTableParams({
					sorting: {
						name: 'asc'
					},
					filter: { name: ''}
				}, { dataset: $scope.students}
			);
		});

		$scope.addStudent = function (student) {
			StudentsService.add(student).$promise.then(function (resp) {
				$scope.students.push(resp);
				$scope.tableParams.reload();
				$scope.student = {};
				$scope.formShown = false;
			}, function (err) {
				console.log('Ошибка', err);
				$scope.student = {};
				$scope.formShown = false;
			});
		};
	}]);