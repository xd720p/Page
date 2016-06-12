myApp.controller('StudentsController', [
	'$scope',
	'$filter',
	'StudentsService',
	'GroupService',
	'TeachersService',
	'$rootScope',
	'$http',
	'$timeout',
	'NgTableParams',
	function($scope, $filter, StudentsService, GroupService, TeachersService, $rootScope, $http, $timeout, NgTableParams) {

		$scope.title = 'Студенты';
		$scope.students = [];
		$scope.formShown = false;
		$scope.student = {};

		$scope.teachers = [];
		$scope.selectedTeacher = { value: '' };

		$scope.groups = [];
		$scope.selectedGroup = { value: '' };

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

		TeachersService.query().$promise.then(function (resp) {
			$scope.teachers = resp;
		});

		GroupService.query().$promise.then(function (resp) {
			$scope.groups = resp;
		});

		$scope.$watchCollection('selectedTeacher', function (newValue, oldValue, scope) {
			scope.student.teacherName = scope.selectedTeacher.value.name;
		});

		$scope.$watchCollection('selectedGroup', function (newValue, oldValue, scope) {
			scope.student.groupNumber = scope.selectedGroup.value.groupNumber;
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

		//Editing and delete

		$scope.cancel = function (row, rowForm) {
			row.isEditing = false;
			rowForm.$setPristine();
			var originalRow = _.findWhere($scope.originalData, {groupNumber: row.groupNumber});
			angular.extend(row, originalRow);
		};

		$scope.del = function del(row) {
			GroupService.remove(row).$promise.then(function (resp) {
				var index = _.findIndex($scope.groups, function (elem) {
					return elem.groupNumber === resp.groupNumber;
				});
				$scope.groups.splice(index, 1);
				$scope.tableParams.reload();
			});
		};

		$scope.save = function(row, rowForm) {
			GroupService.update(row).$promise.then(function (resp) {
				angular.extend(row, resp);
				row.isEditing = false;
				rowForm.$setPristine();
				$scope.tableParams.reload();
			}, function (err) {
				console.log('Ошибка', err);
			});
		};
}]);