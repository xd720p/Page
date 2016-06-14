myApp.controller('LoginController', [
	'$scope',
	'$auth',
	'$location',
	'toastr',
	function ($scope, $auth, $location, toastr) {
		$scope.registryForm = false;

		$scope.user = {
			email: '',
			password: ''
		};

		$scope.newUser = {
			fio: '',
			email: '',
			password: ''
		};

		$scope.login = function() {
			$auth.login($scope.user)
					.then(function(resp) {
						toastr.success('You have successfully signed in!');
						$location.path('/teachers');
					})
					.catch(function(error) {
						toastr.error(error.data.message, error.status);
					});
		};


		$scope.signup = function() {
			$auth.signup($scope.newUser)
					.then(function(response) {
						$auth.setToken(response);
						$location.path('/');
						toastr.info('You have successfully created a new account and have been signed-in');
					})
					.catch(function(response) {
						toastr.error(response.data.message);
					});
		};
	}
]);