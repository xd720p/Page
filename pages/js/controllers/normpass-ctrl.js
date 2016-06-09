myApp.controller('NormPassController', [
	'$scope',
	'$filter',
	'NormPassService',
	'$rootScope',
	'$http',
	'$timeout',
	'NgTableParams',
	function($scope, $filter, NormPassService, $rootScope, $http, $timeout, NgTableParams) {

		$scope.title = 'Нормативы';
		$scope.norms = [];
		$scope.formShown = false;
		$scope.norm = {};

		NormPassService.query().$promise.then(function (resp) {
			$scope.norms = resp;

			$scope.tableParams = new NgTableParams({
					sorting: {
						uniqID: 'asc'
					}
				}, { dataset: $scope.norms}
			);
		});

		$scope.addPassedNorm = function (norm) {
			NormPassService.add(norm).$promise.then(function (resp) {
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