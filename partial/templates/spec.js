describe('<%= ctrlname %>', function () {
    'use strict';

    var <%= ctrlname %>, $scope,
        evt = {
            stopPropagation: angular.noop,
            preventDefault: angular.noop
        },
        spy = sinon.spy();

    beforeEach(module('app'));
    beforeEach(module('app.<%= name %>'));
    
    beforeEach(inject(function ($controller, $rootScope) {
        $scope = $rootScope.$new();
        $scope.setBaseCssClass = spy;

        <%= ctrlname %> = $controller('<%= ctrlname %>', {
            $scope: $scope
        });
    }));

    it('should set base css class', function () {
        expect(spy.calledWith('<%= name %>')).toBeTruthy();
    });
});