describe('<%= ctrlname %>', function () {
    'use strict';

    var <%= ctrlname %>, $scope, $httpBackend,
        evt = {
            stopPropagation: angular.noop,
            preventDefault: angular.noop
        };

    beforeEach(module('app.<%= name %>'));
    
    beforeEach(inject(function ($controller, $compile, $rootScope) {
        $scope = $rootScope.$new();

        <%= ctrlname %> = $controller('<%= ctrlname %>', {
            $scope: $scope,
            $compile: $compile
        });
    }));

    it('should not be implemented', function () {
        expect($scope.status).toBe('Not Implemented');
    });
});