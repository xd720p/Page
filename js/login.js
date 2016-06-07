'use strict';

if (!String.prototype.parseUrlParams) {
	String.prototype.parseUrlParams = function parseUrlParams(){
		var paramsStr = (this + "").split("?")[1] || "";
		var params = {};
		$.each(paramsStr.split('&'), function(i, pairStr){
			if (pairStr === ""){
				return;
			}
			var pair = pairStr.split('=');
			params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
		});

		return params;
	};
}
/*
* Модуль аутентификации
*/
angular.module('auth-app', [])

/*
* Сервис аутентификации
*/
.factory('Auth', function($http){
	return {
		logout: function() {
			return $http.get('logout');
		},
		login: function(inputs) {
			return $http({
				method: 'POST',
				url: 'login',
				headers: {
					'Accept': '*/*',
					'X-Requested-With': 'XMLHttpRequest',
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				},
				data: inputs
			});
		}
	};
})
/*
* Контроллер страницы логина
*/
.controller('LoginController', function($scope, Auth){
	$scope.user = { credentials: {} };
	$scope.errorMessage = "";

	$scope.submit = function(event){
		event.preventDefault();
		$scope.errorMessage = "";
		if (!$scope.user.credentials.username || !$scope.user.credentials.password) {
			$scope.errorMessage = "Логин и пароль не должны быть пустыми";
			return;
		}
		$scope.loginUser();
	};

	// аутентификация пользователя
	$scope.loginUser = function() {
		Auth.login(
			$('form').serialize()
		).success( function( data, status, headers, config) {
			if (data.error) {
				console.error(data.error);
			} else {
				console.log("You are signed in!");
				//$scope.loadAuth();
				$scope.user.credentials = {};

				var callbackUrl = location.search.parseUrlParams()['callbackUrl'];

				if (!callbackUrl) {
					callbackUrl = location.pathname.replace(/(.*\/)[^/]*/, '$1');
				}

				location.href = callbackUrl;
			}
		}).error( function(data, status, headers, config){
			$scope.user.credentials["password"] = "";
			console.error('Authentication error ', data);
			var msg = (status !== 403) ? 'Что-то пошло не так...' : 'Неверный логин или пароль';
			$scope.errorMessage = msg;
		});
	};
});
