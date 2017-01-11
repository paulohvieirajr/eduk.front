(function() {
	'use strict';

	angular.module('app')
	.directive('ngRepeatLast', function() {
  	return function(scope, element, attrs) {
    	if (scope.$last){
      	$('#dataTable').DataTable();
    	}
  	};
	});
})();
