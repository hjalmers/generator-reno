angular.amd.module('app.<%= name %>', [
    
])

.config(['$routeProvider',
    function ($routeProvider) {
        'use strict';

        <%= routeData %>
    }
])

.controller('<%= ctrlname %>', ['$scope', 
	function($scope){
		'use strict';

        $scope.setBaseCssClass('<%= name %>');

        $scope.$emit('app:state', 'page:loaded');
	}
]);