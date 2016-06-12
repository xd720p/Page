myApp.controller('NormsController', [
	'$scope',
	'$filter',
	'NormService',
	'$rootScope',
	'$http',
	'$timeout',
	'NgTableParams',
	function($scope, $filter, NormService, $rootScope, $http, $timeout, NgTableParams) {

		$scope.title = 'Нормативы';
		$scope.norms = [];
		$scope.formShown = false;
		$scope.norm = {};

		NormService.query().$promise.then(function (resp) {
			$scope.norms = resp;
			$scope.originalData = angular.copy($scope.norms);

			$scope.tableParams = new NgTableParams({
					sorting: {
						name: 'asc'
					}
				}, { dataset: $scope.norms}
			);
		});

		$scope.addNorm = function (norm) {
			NormService.add(norm).$promise.then(function (resp) {
				$scope.norms.push(resp);
				$scope.tableParams.reload();
				$scope.norm = {};
				$scope.formShown = false;
			}, function (err) {
				console.log('Ошибка', err);
				$scope.norm = {};
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
			NormService.remove(row).$promise.then(function (resp) {
				var index = _.findIndex($scope.norms, function (elem) {
					return elem.name === resp.name;
				});
				$scope.norms.splice(index, 1);
				$scope.tableParams.reload();
			});
		};

		$scope.save = function(row, rowForm) {
			NormService.update(row).$promise.then(function (resp) {
				angular.extend(row, resp);
				row.isEditing = false;
				rowForm.$setPristine();
				$scope.tableParams.reload();
			}, function (err) {
				console.log('Ошибка', err);
			});
		};
	}]);