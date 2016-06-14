myApp.controller('StudentDateController', [
	'$scope',
	'$filter',
	'StudentDateService',
	'$rootScope',
	'$http',
	'$timeout',
	'NgTableParams',
	function($scope, $filter, StudentDateService, $rootScope, $http, $timeout, NgTableParams) {

		$scope.title = 'Журнал посещаемости';
		$scope.students = [];
		$scope.formShown = false;
		$scope.student = {};
		$scope.attendance = {};

		$scope.faculties = ['ФРТ', 'ФЭЛ', 'ФКТИ', 'ФЭА', 'ФИБС', 'ФЭМ', 'ГФ'];
		$scope.courses = [1, 2, 3, 4, 5, 6];
		$scope.attendanceHistory = [];
		$scope.cols = [];

		StudentDateService.query().$promise.then(function (resp) {
			$scope.students = resp;

			$scope.tableParams = new NgTableParams({
					sorting: {
						name: 'asc'
					},
					filter: { name: ''}
				}, { dataset: $scope.students}
			);
		});

		$scope.addStudentDate = function (student) {
			StudentDateService.add(student).$promise.then(function (resp) {
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


		$scope.datePicker = {
			date: {
				startDate: moment(),
				endDate: moment()
			},
			options: {
				parentEl: '.right_col',
				opens: 'left',
				dateLimit: {
					"months": 1
				},
				locale: {
					cancelLabel: 'Очистить',
					applyLabel: 'Сохранить'
				}
			}
		};

		$scope.getAttendanceInfo = function () {
			$scope.attendance.discipline = $rootScope.currentUser.discipline;
			$scope.attendance.from = $scope.datePicker.date.startDate;
			$scope.attendance.to = $scope.datePicker.date.endDate;

			StudentDateService.history(attendance).promise.then(function (resp) {
				$scope.attendanceHistory = resp;

				var headers = _.keys($scope.attendanceHistory[0]);
				for(var i = 0; i < headers.length; i++ ) {
					var col;
					if (i === 0) {
						col = {
							field: i,
							title: i,
							sortable: i,
							show: true
						}
					} else {
						col = {
							field: i,
							title: i,
							show: true
						}
					}

					$scope.cols.push(col);
				}

				$scope.tableParams = new NgTableParams({
							sorting: {
								name: 'asc'
							},
							filter: { name: ''},
							count: 100
						}, {
					dataset: $scope.attendanceHistory,
					counts: []
				}
				);
			});
		}
}]);
