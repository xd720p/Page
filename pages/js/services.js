'use strict';

myApp.factory('TeachersService', ['$resource',
	function ($resource) {
		var path = '/teachers';
		return $resource(path, {}, {
			query: {
				method: 'GET',
				isArray: true,
				responseType: 'json'
			},

			add: {
				url: path + '/add',
				method: 'POST',
				isArray: false,
				responseType: 'json'
			}
		});
	}
]);

myApp.factory('GroupService', ['$resource',
	function ($resource) {
		var path = '/group';
		return $resource(path, {
			query: {
				method: 'GET',
				isArray: true,
				responseType: 'json'
			}
		});
	}
]);