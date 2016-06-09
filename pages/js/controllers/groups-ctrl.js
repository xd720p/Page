myApp.controller('GroupsController', [
	'$scope',
	'$filter',
	'GroupService',
	'$rootScope',
	'$http',
	'$timeout',
	'NgTableParams',
	function($scope, $filter, GroupService, $rootScope, $http, $timeout, NgTableParams) {

		$scope.title = 'Группы';
		$scope.groups = [];
		$scope.formShown = false;
		$scope.group = {};

		GroupService.query().$promise.then(function (resp) {
			$scope.groups = resp;

			$scope.tableParams = new NgTableParams({
					sorting: {
						groupNumber: 'asc'
					}
				}, { dataset: $scope.groups}
			);
		});

		$scope.addGroup = function (group) {
			GroupService.add(group).$promise.then(function (resp) {
				$scope.groups.push(resp);
				$scope.tableParams.reload();
				$scope.group = {};
				$scope.formShown = false;
			}, function (err) {
				console.log('Ошибка', err);
				$scope.group = {};
				$scope.formShown = false;
			});
		};
	}]);