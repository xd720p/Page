myApp.controller('DisciplinesController', [
	'$scope',
	'$filter',
	'DisciplineService',
	'$rootScope',
	'$http',
	'$timeout',
	'NgTableParams',
	function($scope, $filter, DisciplineService, $rootScope, $http, $timeout, NgTableParams) {

		$scope.title = 'Дисциплины';
		$scope.disciplines = [];
		$scope.formShown = false;
		$scope.discipline = {};

		DisciplineService.query().$promise.then(function (resp) {
			$scope.disciplines = resp;
			$scope.originalData = angular.copy($scope.disciplines);

			$scope.tableParams = new NgTableParams({
					sorting: {
						shortName: 'asc'
					}
				}, { dataset: $scope.disciplines}
			);
		});

		$scope.addDiscipline = function (discipline) {
			DisciplineService.add(discipline).$promise.then(function (resp) {
				$scope.disciplines.push(resp);
				$scope.tableParams.reload();
				$scope.discipline = {};
				$scope.formShown = false;
			}, function (err) {
				console.log('Ошибка', err);
				$scope.discipline = {};
				$scope.formShown = false;
			});
		};

		//Editing and delete

		$scope.cancel = function (row, rowForm) {
			row.isEditing = false;
			rowForm.$setPristine();
			var originalRow = _.findWhere($scope.originalData, {shortName: row.shortName});
			angular.extend(row, originalRow);
		};

		$scope.del = function del(row) {
			DisciplineService.remove(row).$promise.then(function (resp) {
				var index = _.findIndex($scope.disciplines, function (elem) {
					return elem.shortName === resp.shortName;
				});
				$scope.disciplines.splice(index, 1);
				$scope.tableParams.reload();
			});
		};

		$scope.save = function(row, rowForm) {
			DisciplineService.update(row).$promise.then(function (resp) {
				angular.extend(row, resp);
				row.isEditing = false;
				rowForm.$setPristine();
				$scope.tableParams.reload();
			}, function (err) {
				console.log('Ошибка', err);
			});
		};
}]);