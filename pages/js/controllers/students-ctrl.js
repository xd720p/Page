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
	}]);