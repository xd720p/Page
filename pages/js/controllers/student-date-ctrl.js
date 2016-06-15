myApp.controller('StudentDateController', [
	'$scope',
	'$filter',
	'StudentDateService',
	'$rootScope',
	'$http',
	'$timeout',
	'NgTableParams',
	'toastr',
	function($scope, $filter, StudentDateService, $rootScope, $http, $timeout, NgTableParams, toastr) {

		$scope.title = 'Журнал посещаемости';
		$scope.students = [];
		$scope.formShown = false;
		$scope.student = {};
		$scope.attendance = {};
		$scope.setAttendance = {};
		$scope.chosenFaculty = {
			value: ''
		};

		$scope.tab = 1;
		$scope.isSet = function(checkTab) {
			return $scope.tab === checkTab;
		};

		$scope.setTab = function(setTab) {
			$scope.tab = setTab;
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
					applyLabel: 'Сохранить',
					format: 'DD/MM/YYYY'
				}
			}
		};


		$scope.getAttendanceInfo = function () {
			$scope.cols = [];
			$scope.attendance.discipline = $rootScope.currentUser.discipline;
			$scope.attendance.faculty = $scope.chosenFaculty.value.number;

			var plus3start = moment($scope.datePicker.date.startDate).add(3, 'hours');
			var plus3end = moment($scope.datePicker.date.endDate).add(3, 'hours');

			$scope.attendance.firstDate = moment.parseZone(plus3start).utc().format('YYYY-MM-DD');
			$scope.attendance.lastDate = moment.parseZone(plus3end).utc().format('YYYY-MM-DD');

			StudentDateService.history($scope.attendance).$promise.then(function (resp) {
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
							field:headers[i], //moment(i).format('DD MM'),
							title: moment(headers[i]).format('DD/MM'),
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
					dataset: $scope.attendanceHistory,
					counts: []
				}
				);
			});
		};




		$scope.singleDatePicker = {
			date: moment().startOf('day'),
			options: {
				singleDatePicker: true,
				parentEl: '.right_col'
			}
		};

		$scope.chosenDate = {};
		$scope.sendedDate = '';

		$scope.visitStatus = ['П', 'Н', 'Б', 'У'];

		$scope.getStudents = function () {
			$scope.setAttendance.discipline = $rootScope.currentUser.discipline;
			$scope.setAttendance.faculty = $scope.chosenFaculty.value.number;

			StudentDateService.query($scope.setAttendance).$promise.then(function (resp) {
				$scope.students = resp;

				$scope.tableParams = new NgTableParams({
							sorting: {
								studentName: 'asc'
							}
							//count: 100
						}, {
							dataset: $scope.students,
							counts: []
						}
				);
			});
		};

		$scope.$watchCollection('singleDatePicker', function () {
			var date = $scope.singleDatePicker.date;
			$scope.chosenDate = moment(date).format('DD/MM/YYYY');
		});

		$scope.setAttendanceInfo = function () {
			var plus3date = moment($scope.singleDatePicker.date).add(3, 'hours');
			$scope.sendedDate = moment.parseZone(plus3date).utc().format();

			$scope.students.forEach(function (item, i, arr) {
				item.date = $scope.sendedDate;
			});
			console.log($scope.students);

			StudentDateService.save($scope.students).$promise.then(function () {
				toastr.success('Данные о посещаемости сохранены!');
			}, function (error) {
				toastr.error(error.data.message, error.status);
			});
		};
}]);
