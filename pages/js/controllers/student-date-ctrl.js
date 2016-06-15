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
		$scope.chosenFaculty = {
			value: ''
		};

		$scope.faculties = [{
			number: 1,
			name:'ФРТ'
		}, {
			number: 2,
			name:'ФЭЛ'
		}, {
			number: 3,
			name:'ФКТИ'
		}, {
			number: 4,
			name:'ФЭА'
		}, {
			number: 5,
			name:'ФИБС'
		}, {
			number: 6,
			name:'ФЭМ'
		}, {
			number: 7,
			name:'ГФ'
		}];
		$scope.courses = [1, 2, 3, 4, 5, 6];
		$scope.attendanceHistory = [];
		$scope.cols = [];

		/*StudentDateService.query().$promise.then(function (resp) {
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
		};*/


		$scope.datePicker = {
			date: {
				startDate: moment().startOf('day'),
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
					applyLabel: 'Сохранить',
					format: 'DD/MM/YYYY'
				}
			}
		};

		/*$scope.attendanceHistory = [
			{
				name: 'Козлов Пётр',
				'16.09': 'был',
				'25.09': 'не был',
				'31.09': 'был',
				'03.10': 'был',
				'08.10': 'был',
				'12.10': 'не был',
				'16.10': 'был',
				'25.10': 'не был',
				'31.10': 'был',
				'03.11': 'был',
				'08.11': 'был',
				'12.11': 'не был'
			},
			{
				name: 'Марашов Алексей',
				'16.09': 'был',
				'25.09': 'не был',
				'31.09': 'был',
				'03.10': 'был',
				'08.10': 'был',
				'12.10': 'не был',
				'16.10': 'был',
				'25.10': 'не был',
				'31.10': 'был',
				'03.11': 'был',
				'08.11': 'был',
				'12.11': 'не был'
			},
			{
				name: 'Данилов Семён',
				'16.09': 'был',
				'25.09': 'не был',
				'31.09': 'был',
				'03.10': 'был',
				'08.10': 'был',
				'12.10': 'не был',
				'16.10': 'был',
				'25.10': 'не был',
				'31.10': 'был',
				'03.11': 'был',
				'08.11': 'был',
				'12.11': 'не был'
			},
			{
				name: 'Максимов Максим',
				'16.09': 'был',
				'25.09': 'не был',
				'31.09': 'был',
				'03.10': 'был',
				'08.10': 'был',
				'12.10': 'не был',
				'16.10': 'был',
				'25.10': 'не был',
				'31.10': 'был',
				'03.11': 'был',
				'08.11': 'был',
				'12.11': 'не был'
			},
			{
				name: 'Булатов Рафис',
				'16.09': 'был',
				'25.09': 'не был',
				'31.09': 'был',
				'03.10': 'был',
				'08.10': 'был',
				'12.10': 'не был',
				'16.10': 'был',
				'25.10': 'не был',
				'31.10': 'был',
				'03.11': 'был',
				'08.11': 'был',
				'12.11': 'не был'
			},
			{
				name: 'Минзарипова Лилия',
				'16.09': 'был',
				'25.09': 'не был',
				'31.09': 'был',
				'03.10': 'был',
				'08.10': 'был',
				'12.10': 'не был',
				'16.10': 'был',
				'25.10': 'не был',
				'31.10': 'был',
				'03.11': 'был',
				'08.11': 'был',
				'12.11': 'не был'
			},
			{
				name: 'Жгенти Мария',
				'16.09': 'был',
				'25.09': 'не был',
				'31.09': 'был',
				'03.10': 'был',
				'08.10': 'был',
				'12.10': 'не был',
				'16.10': 'был',
				'25.10': 'не был',
				'31.10': 'был',
				'03.11': 'был',
				'08.11': 'был',
				'12.11': 'не был'
			}
		];*/

		/*$scope.getAttendanceInfo = function () {
				var headers = _.keys($scope.attendanceHistory[0]);

				for(var i = 0; i < headers.length; i++ ) {
					var col;
					if (i === 0) {
						col = {
							field: headers[i],
							title: 'Студент',
							sortable: headers[i],
							filter: { name: "text" },
							show: true
						}
					} else {
						col = {
							field: headers[i],
							title: headers[i],
							show: true
						}
					}
					$scope.cols.push(col);
				}
				console.log($scope.cols);
				$scope.tableParams = new NgTableParams({
							sorting: {
								name: 'asc'
							}
							//count: 100
						}, {
							dataset: $scope.attendanceHistory
							//counts: []
						}
				);
		};*/


		$scope.getAttendanceInfo = function () {
			$scope.attendance.discipline = $rootScope.currentUser.discipline;
			$scope.attendance.firstDate = $scope.datePicker.date.startDate;
			$scope.attendance.lastDate = $scope.datePicker.date.endDate;
			$scope.attendance.faculty = $scope.chosenFaculty.value.number;

			StudentDateService.history($scope.attendance).promise.then(function (resp) {
				$scope.attendanceHistory = resp;

				var headers = _.keys($scope.attendanceHistory[0]);
				for(var i = 0; i < headers.length; i++ ) {
					var col;
					if (i === 0) {
						col = {
							field: headers[i],
							title: 'Студент',
							sortable: headers[i],
							filter: { name: "text" },
							show: true
						}
					} else {
						col = {
							field: headers[i], //moment(i).format('DD MM'),
							title: headers[i],
							show: true
						}
					}

					$scope.cols.push(col);
				}

				$scope.tableParams = new NgTableParams({
					sorting: {
						name: 'asc'
					}
					//count: 100
				}, {
					dataset: $scope.attendanceHistory
					//counts: []
				}
				);
			});
		};
}]);
