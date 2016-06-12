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