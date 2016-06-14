'use strict';

/* App Module */
var underscore = angular.module('underscore', []);
underscore.factory('_', function() {
	return window._; //Underscore must already be loaded on the page
});

var myApp = angular.module('myApp', [
	'ui.router',
	'ngTable',
	'ngResource',
	'ui.select',
	'ngSanitize',
	'daterangepicker',
	'ngAnimate',
	'underscore',
	'ui.bootstrap',
	'angular-confirm',
	'satellizer',
	'toastr'
]);

myApp.config(['$stateProvider', '$urlRouterProvider', '$authProvider',
	function($stateProvider, $urlRouterProvider, $authProvider) {
		$urlRouterProvider.otherwise('/teachers');

		$stateProvider

			.state('root', {
				url: '',
				templateUrl: 'partials/root.html',
				controller: 'RootController',
				abstract: true
			})

				.state('root.teachers', {
					url: '/teachers',
					controller: 'TeachersController',
					templateUrl: 'partials/teachers.html',
					resolve: {
						loginRequired: loginRequired
					}
				})

				.state('root.discipline', {
					url: '/discipline',
					templateUrl: 'partials/discipline.html',
					controller: 'DisciplinesController',
					resolve: {
						loginRequired: loginRequired
					}
				})

				.state('root.group', {
					url: '/group',
					controller: 'GroupsController',
					templateUrl: 'partials/group.html',
					resolve: {
						loginRequired: loginRequired
					}
				})

				.state('root.norm', {
					url: '/norm',
					controller: 'NormsController',
					templateUrl: 'partials/norm.html',
					resolve: {
						loginRequired: loginRequired
					}
				})

				.state('root.normpass', {
					url: '/normpass',
					controller: 'NormPassController',
					templateUrl: 'partials/normpass.html',
					resolve: {
						loginRequired: loginRequired
					}
				})

				.state('root.students', {
					url: '/students',
					controller: 'StudentsController',
					templateUrl: 'partials/students.html',
					resolve: {
						loginRequired: loginRequired
					}
				})

				.state('root.studentdate', {
					url: '/studentdate',
					controller: 'StudentDateController',
					templateUrl: 'partials/studentdate.html',
					resolve: {
						loginRequired: loginRequired
					}
				})

			.state('login', {
				url: '/login',
				controller: 'LoginController',
				templateUrl: 'partials/login.html',
				resolve: {
					skipIfLoggedIn: skipIfLoggedIn
				}
			});

		function skipIfLoggedIn($q, $auth) {
			var deferred = $q.defer();
			if ($auth.isAuthenticated()) {
				deferred.reject();
			} else {
				deferred.resolve();
			}
			return deferred.promise;
		}

		function loginRequired($q, $location, $auth) {
			var deferred = $q.defer();
			if ($auth.isAuthenticated()) {
				deferred.resolve();
			} else {
				$location.path('/login');
				/*$state.go('login');*/

			}
			return deferred.promise;
		}
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
		}
	});

}]);*/
