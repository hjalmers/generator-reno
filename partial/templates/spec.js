describe('<%= ctrlname %>', function () {
    'use strict';

    var <%= ctrlname %>, $scope,
        evt = {
            stopPropagation: angular.noop,
            preventDefault: angular.noop
        };

    beforeEach(module('app'));
    beforeEach(module('app.<%= name %>'));
    
    beforeEach(inject(function ($controller, $rootScope) {
        $scope = $rootScope.$new();

        <%= ctrlname %> = $controller('<%= ctrlname %>', {
            $scope: $scope
        });
    }));

    it('should not be implemented', function () {
        expect($scope.status).toBe('Not Implemented');
    });
});