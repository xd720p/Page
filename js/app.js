'use strict';

/* App Module */

var myApp = angular.module('myApp', [
  'ui.router',
  'ngTable',
  'auth-app'

]);

myApp.config(['$stateProvider', '$urlRouterProvider', 'NotificationProvider', '$provide', '$httpProvider',
  function($stateProvider, $urlRouterProvider, NotificationProvider, $provide, $httpProvider) {
    $urlRouterProvider.otherwise('/friends');

    $stateProvider

      .state('root', {
        url: '',
        controller: 'RootCtrl',
        abstract: true,
        templateUrl: '/m2m/app/root.html'
      })

        .state('root.students', {         //Используем ui-sref="root.students"
          url: '/students',
          controller: 'StudentsCtrl',
          templateUrl: '/m2m/app/friends/friends.html',
          abstract: true
        })

          .state('root.friends.list', {
            url: '',
            templateUrl: '/m2m/app/friends/list/list.html',
            controller: 'FriendListCtrl'
          })

          .state('root.friends.location', {
            url: '/:id',
            controller: 'FriendLocationCtrl',
            templateUrl: '/m2m/app/friends/locations/locations.html'
          })

        .state('root.requests', {
          url: '/requests',
          controller: 'RequestsCtrl',
          templateUrl: '/m2m/app/requests/requests.html',
        })

      .state('login', {
        url: '/login?callbackUrl',
        controller: 'LoginController',
        templateUrl: '/m2m/app/login.html'
      });
  }]);

myApp.run(['$rootScope', '$state', function($rootScope, $state) {

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

  }]);