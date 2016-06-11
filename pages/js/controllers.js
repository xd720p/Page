'use strict';

myApp.controller('RootController', [
	'$scope',
	'$rootScope',
	'$http',
	'$timeout',
	function($scope, $rootScope, $http, $timeout) {

		$scope.title = 'Teachers page';
		$scope.faculty = false;
		$scope.students = false;
		$scope.progress = false;

		$scope.menu = [
			{
				title: 'Кафедра',
				icon: 'fa-home',
				content: [
					{name: 'Дисциплины', href: 'root.discipline'},
					{name: 'Преподаватели', href: 'root.teachers'}
				]
			},
			{
				title: 'Списки',
				icon: 'fa-table',
				content: [
					{name: 'Студенты', href: 'root.students'},
					{name: 'Нормативы', href: 'root.norm'},
					{name: 'Группы', href: 'root.group'}
				]
			},
			{
				title: 'Успеваемость',
				icon: 'fa-bar-chart-o',
				content: [
					{name: 'Журнал посещаемости', href: 'root.studentdate'},
					{name: 'Сдача нормативов', href: 'root.normpass'}
				]
			}
		];

		$scope.tab = {
			opened: '',
			isOpened: function (index) {
				return this.opened === index;
			},
			open: function (index) {
				this.opened = index;
			}
		}
}]);


