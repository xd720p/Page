myApp.controller('TeachersController', [
	'$scope',
	'$filter',
	'TeachersService',
	'DisciplineService',
	'$rootScope',
	'$http',
	'$timeout',
	'NgTableParams',
	function($scope, $filter, TeachersService, DisciplineService, $rootScope, $http, $timeout, NgTableParams) {

		$scope.title = 'Преподаватели';
		$scope.teachers = [];
		$scope.formShown = false;
		$scope.teacher = {};

		$scope.disciplines = [];
		$scope.selectedDisc = { value: '' };

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

		DisciplineService.query().$promise.then(function (resp) {
			$scope.disciplines = resp;
		});

		$scope.$watchCollection('selectedDisc', function (newValue, oldValue, scope) {
			scope.teacher.discipline = scope.selectedDisc.value.shortName;
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