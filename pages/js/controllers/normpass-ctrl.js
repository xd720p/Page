myApp.controller('NormPassController', [
	'$scope',
	'$filter',
	'NormPassService',
	'StudentsService',
	'NormService',
	'$rootScope',
	'$http',
	'$timeout',
	'NgTableParams',
	function($scope, $filter, NormPassService, StudentsService, NormService, $rootScope, $http, $timeout, NgTableParams) {

		$scope.title = 'Нормативы';
		$scope.passedNorms = [];
		$scope.formShown = false;
		$scope.norm = {};

		$scope.students=[];
		$scope.selectedStudent = { value: '' };

		$scope.norms = [];
		$scope.selectedNorm = { value: ''};

		$scope.datePicker = {
			date: moment(),
			options: {
				singleDatePicker: true,
				parentEl: '.right_col',
				drops: 'up'
			}
		};

		NormPassService.query().$promise.then(function (resp) {
			$scope.passedNorms = resp;
			$scope.tableParams = new NgTableParams({
					sorting: {
						studentName: 'asc'
					}
				}, { dataset: $scope.passedNorms}
			);
		});

		StudentsService.query().$promise.then(function (resp) {
			$scope.students = resp;
		});

		NormService.query().$promise.then(function (resp) {
			$scope.norms = resp;
		});

		$scope.$watchCollection('selectedStudent', function (newValue, oldValue, scope) {
			scope.norm.uniqID = scope.selectedStudent.value.uniqID;
			scope.norm.studentName = scope.selectedStudent.value.name;
		});

		$scope.$watchCollection('datePicker', function (newValue, oldValue, scope) {
			scope.norm.date = scope.datePicker.date;
		});

		$scope.$watchCollection('selectedNorm', function (newValue, oldValue, scope) {
			scope.norm.normName = scope.selectedNorm.value.name;
		});

		$scope.addPassedNorm = function (norm) {
			NormPassService.add(norm).$promise.then(function (resp) {
				$scope.passedNorms.push(resp);
				$scope.tableParams.reload();
				$scope.norm = {};
				$scope.formShown = false;
			}, function (err) {
				console.log('Ошибка', err);
				$scope.norm = {};
				$scope.selectedStudent = {
					value: ''
				};
				$scope.formShown = false;
			});
		};
	}]);