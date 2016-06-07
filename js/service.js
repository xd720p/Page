'use strict';

angular.module('myApp').factory('StudentsService', ['$resource',

	function($resource) {

		var path = '/students'; //попробовать передавать сюда адрес из stateParams

		return $resource(path, {id: '@id'}, {

			query: {
				method: 'GET',
				isArray: true,
				responseType: 'json'
			},

			get: {
				url: path + '/:id',
				method: 'GET',
				isArray: false,
				responseType: 'json'
			},

			post: {
				method: 'POST',
				isArray: false,
				responseType: 'json'
			},

			update: {
				url: path + '/:id',
				method: 'PUT',
				isArray: false,
				responseType: 'json'
			},

			delete: {
				url: path + '/:id',
				method: 'DELETE'
			}

		});
	}
]);