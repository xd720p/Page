myApp.controller('GroupsController', [
	'$scope',
	'$filter',
	'GroupService',
	'$rootScope',
	'$http',
	'$timeout',
	'NgTableParams',
	'_',
	function($scope, $filter, GroupService, $rootScope, $http, $timeout, NgTableParams, _) {
		init = function() {
			_.keys($scope);
		};

		init();

		$scope.title = 'Группы';
		$scope.groups = [];
		$scope.formShown = false;
		$scope.group = {};

		$scope.originalData = [];

		GroupService.query().$promise.then(function (resp) {
			$scope.groups = resp;
			$scope.originalData = angular.copy($scope.groups);

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