angular.amd.module('app.<%= name %>', [
    
])

.config(['$routeProvider',
    function ($routeProvider) {
        'use strict';

        <%= routeData || '' %>
    }
])

.controller('<%= ctrlname %>', ['$scope', 
	function($scope){

}]);