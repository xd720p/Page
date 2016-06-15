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
			},

			remove: {
				url: path + '/remove',
				method: 'POST',
				isArray: false,
				responseType: 'json'
			},

			update: {
				url: path + '/update',
				method: 'PUT',
				isArray: false,
				responseType: 'json'
			}
		});
	}
]);

myApp.factory('DisciplineService', ['$resource',
	function ($resource) {
		var path = '/discipline';

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
			},

			remove: {
				url: path + '/remove',
				method: 'POST',
				isArray: false,
				responseType: 'json'
			},

			update: {
				url: path + '/update',
				method: 'PUT',
				isArray: false,
				responseType: 'json'
			}
		});
	}
]);

myApp.factory('GroupService', ['$resource',
	function ($resource) {
		var path = '/group';

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
			},

			remove: {
				url: path + '/remove',
				method: 'POST',
				isArray: false,
				responseType: 'json'
			},

			update: {
				url: path + '/update',
				method: 'PUT',
				isArray: false,
				responseType: 'json'
			}
		});
	}
]);

myApp.factory('NormService', ['$resource',
	function ($resource) {
		var path = '/norm';

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
			},

			remove: {
				url: path + '/remove',
				method: 'POST',
				isArray: false,
				responseType: 'json'
			},

			update: {
				url: path + '/update',
				method: 'PUT',
				isArray: false,
				responseType: 'json'
			}
		});
	}
]);

myApp.factory('NormPassService', ['$resource',
	function ($resource) {
		var path = '/normpass';

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
			},

			remove: {
				url: path + '/remove',
				method: 'POST',
				isArray: false,
				responseType: 'json'
			},

			update: {
				url: path + '/update',
				method: 'PUT',
				isArray: false,
				responseType: 'json'
			}
		});
	}
]);

myApp.factory('StudentsService', ['$resource',
	function ($resource) {
		var path = '/students';

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
			},

			remove: {
				url: path + '/remove',
				method: 'POST',
				isArray: false,
				responseType: 'json'
			},

			update: {
				url: path + '/update',
				method: 'PUT',
				isArray: false,
				responseType: 'json'
			}
		});
	}
]);

myApp.factory('StudentDateService', ['$resource',
	function ($resource) {
		var path = '/studentdate';

		return $resource(path, {}, {
			history: {
				method: 'GET',
				isArray: true,
				responseType: 'json'
			},

			query: {
				url: path + '/get',
				method: 'GET',
				isArray: true,
				responseType: 'json'
			},

			save: {
				url: path + '/add',
				method: 'POST',
				isArray: false,
				responseType: 'json'
			}


		});
	}
]);