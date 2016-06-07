'use strict';

myApp.factory('TeachersService', ['$resource',
	function ($resource) {
		var path = '/teachers';
		return $resource(path, {
			query: {
				method: 'GET',
				isArray: true,
				responseType: 'json'
			}
		});
	}
]);