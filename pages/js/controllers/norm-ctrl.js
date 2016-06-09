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
	}]);