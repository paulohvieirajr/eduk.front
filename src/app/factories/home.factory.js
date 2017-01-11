(function() {
	'use strict';

	angular.module('app').factory("homeFactory", homeFactory);

	homeFactory.$inject = ['$http', 'urlApi'];

	function homeFactory($http, urlApi) {
		return {
			get: get
		};

    function get() {
      return $http.get(urlApi + '66d7f5bfafc86a99049c42653a3938b6/raw/492ff2c1e527663883e897c6c079f83c836f4751/courses.json');
    }
	}
})();
