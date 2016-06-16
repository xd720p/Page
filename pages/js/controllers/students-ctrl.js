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
	'Upload',
	'toastr',
	function($scope, $filter, StudentsService, GroupService, TeachersService, $rootScope, $http, $timeout, NgTableParams, Upload, toastr) {

		$scope.title = 'Студенты';
		$scope.students = [];
		$scope.formShown = false;
		$scope.student = {};

		$scope.teachers = [];
		$scope.selectedTeacher = { value: '' };

		$scope.groups = [];
		$scope.selectedGroup = { value: '' };

		$scope.medAccesses = [
			{name: 'Основной'},
			{name: 'Подготовительный'},
			{name: 'Специальный'},
			{name: 'Освобождён'},
			{name: 'Нет'}
		];

		$scope.selectedAccess = { value: '' };

		StudentsService.query().$promise.then(function (resp) {
			$scope.students = resp;
			$scope.originalData = angular.copy($scope.students);

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

		$scope.$watchCollection('selectedAccess', function (newValue, oldValue, scope) {
			scope.student.medAccess = scope.selectedAccess.value.name;
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
			var originalRow = _.findWhere($scope.originalData, {uniqID: row.uniqID});
			angular.extend(row, originalRow);
		};

		$scope.del = function del(row) {
			StudentsService.remove(row).$promise.then(function (resp) {
				var index = _.findIndex($scope.students, function (elem) {
					return elem.uniqID === resp.uniqID;
				});
				$scope.students.splice(index, 1);
				$scope.tableParams.reload();
			});
		};

		$scope.save = function(row, rowForm) {
			var group = (function () {
				if(row.groupNumber.groupNumber) {
					return row.groupNumber.groupNumber;
				} else {
					return row.groupNumber;
				}
			})();

			var teacher = (function () {
				if(row.teacherName.name) {
					return row.teacherName.name;
				} else {
					return row.teacherName;
				}
			})();

			var medAccess = (function () {
				if(row.medAccess.name) {
					return row.medAccess.name;
				} else {
					return row.medAccess;
				}
			})();

			var fixedRow = {
				uniqID: row.uniqID,
				name: row.name,
				medAccess: medAccess,
				groupNumber: group,
				teacherName: teacher
			};

			StudentsService.update(fixedRow).$promise.then(function (resp) {
				angular.extend(row, resp);
				row.isEditing = false;
				rowForm.$setPristine();
				$scope.tableParams.reload();
			}, function (err) {
				console.log('Ошибка', err);
			});
		};


		//
		// UPLOAD FILE
		//

		$scope.uploadFiles = function(file, errFiles) {
			$scope.f = file;
			$scope.errFile = errFiles && errFiles[0];
			if (file) {
				file.upload = Upload.upload({
					url: '/students/upload',
					data: {file: file}
				});

				file.upload.then(function (response) {
					$timeout(function () {
						file.result = response.data;
						toastr.success('Студенты загружены, обновите страницу');
					});
				}, function (response) {
					if (response.status > 0)
						$scope.errorMsg = response.status + ': ' + response.data;
				}, function (evt) {
					file.progress = Math.min(100, parseInt(100.0 *
							evt.loaded / evt.total));
				});
			}
		}
}]);