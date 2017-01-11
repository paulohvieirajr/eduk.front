(function() {
	'use strict';

	angular.module('app').controller("homeCtrl", homeCtrl);

	homeCtrl.$inject = ['$scope', 'homeFactory'];

	function homeCtrl($scope, homeFactory) {
		var vm = this;
    $scope.courses = [];

		$scope.init = function() {
			homeFactory.get()
				.then(function(response) {
					$scope.courses = response.data.courses;
          $('#dataTable').DataTable();
				})
				.catch(function(response) {
					console.log(response);
				});
		}

    $scope.init();
	}
})();
