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
	}
]);