'use strict';

angular.module('m2m-friends').controller('StudentsCtrl', ['$scope', '$rootScope', 'StudentsService', '$http', '$timeout',
	function($scope, $rootScope, StudentsService, $http, $timeout) {

//выполнится как только загрузится контроллер
StudentsService.query({
				friendId: $stateParams.id,
				from: '' + $scope.datePicker.date.startDate, //объект с параметрами запроса
				to: '' + $scope.datePicker.date.endDate
			}).$promise.then(function(resp) {
	$scope.students = resp[1];
});

			$scope.addStudents = StudentsService.post(newStudent).$promise.then(function(resp) {
				$scope.students.push(resp);

				//другие действия
			});