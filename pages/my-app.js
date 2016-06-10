'use strict';

/* App Module */

var myApp = angular.module('myApp', [
	'ui.router', 'ngTable', 'ngResource', 'ui.select', 'ngSanitize', 'daterangepicker'
]);

myApp.config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/teachers');

		$stateProvider

			.state('root', {
				url: '',
				templateUrl: 'partials/root.html',
				controller: 'RootController'
			})

				.state('root.teachers', {
					url: '/teachers',
					controller: 'TeachersController',
					templateUrl: 'partials/teachers.html'
				})

				.state('root.discipline', {
					url: '/discipline',
					templateUrl: 'partials/discipline.html',
					controller: 'DisciplinesController'
				})

				.state('root.group', {
					url: '/group',
					controller: 'GroupsController',
					templateUrl: 'partials/group.html'
				})

				.state('root.norm', {
					url: '/norm',
					controller: 'NormsController',
					templateUrl: 'partials/norm.html'
				})

				.state('root.normpass', {
					url: '/normpass',
					controller: 'NormPassController',
					templateUrl: 'partials/normpass.html'
				})

				.state('root.students', {
					url: '/students',
					controller: 'StudentsController',
					templateUrl: 'partials/students.html'
				})

				.state('root.studentdate', {
					url: '/studentdate',
					controller: 'StudentDateController',
					templateUrl: 'partials/studentdate.html'
				});

				/*.state('login', {
					url: '/login?callbackUrl',
					controller: 'LoginController',
					templateUrl: '/m2m/app/login.html'
				});*/
	}]);

/*myApp.run(['$rootScope', '$state', function($rootScope, $state) {

	//@ftl  <#if user.loggedIn>
	$rootScope.user = {
		id: '${user.id}',
		name: '${user.displayName}'
	};
	//@ftl  <#else>
	$rootScope.user = null;
	//@ftl  </#if>

	$rootScope.$on('$stateChangeStart', function (event, toState) {

		if (!Boolean($rootScope.user) && toState.name !== 'login') {
			event.preventDefault();
			$state.go('login', {callbackUrl: encodeURIComponent('${webapp.contextPath}/' +  $state.href(toState.name))});
		}
	});

}]);*/
