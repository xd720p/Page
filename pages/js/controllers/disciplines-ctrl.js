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
}]);