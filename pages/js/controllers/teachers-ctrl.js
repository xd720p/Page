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
		$scope.originalData = [];

		$scope.formShown = false;
		$scope.teacher = {};

		$scope.disciplines = [];
		$scope.selectedDisc = { value: '' };


		$scope.changedDisc = { value: '' };


		TeachersService.query().$promise.then(function (resp) {
			$scope.teachers = resp;
			$scope.originalData = angular.copy($scope.teachers);

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
			console.log($scope.disciplines);
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

		//Editing and delete

		$scope.cancel = function (row, rowForm) {
			row.isEditing = false;
			rowForm.$setPristine();
			var originalRow = _.findWhere($scope.originalData, {name: row.name});
			angular.extend(row, originalRow);
		};

		$scope.del = function del(row) {
			TeachersService.remove(row).$promise.then(function (resp) {
				var index = _.findIndex($scope.teachers, function (elem) {
					return elem.name === resp.name;
				});
				$scope.teachers.splice(index, 1);
				$scope.tableParams.reload();
			});
		};

		$scope.save = function(row, rowForm) {
			var fixedRow = {
				name: row.name,
				post: row.post,
				qualification: row.qualification,
				discipline: row.discipline.shortName,
				authority: row.authority
			};
			TeachersService.update(fixedRow).$promise.then(function (resp) {
				angular.extend(row, resp);
				row.isEditing = false;
				rowForm.$setPristine();
				$scope.tableParams.reload();
			}, function (err) {
				console.log('Ошибка', err);
			});
		};
}]);