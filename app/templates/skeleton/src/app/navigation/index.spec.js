describe('NavigationCtrl', function () {
    'use strict';

    var NavigationCtrl, $location, $scope, $httpBackend,
        evt = {
            stopPropagation: angular.noop,
            preventDefault: angular.noop
        };

    beforeEach(module(function () {
        return function (_$httpBackend_) {
            $httpBackend = _$httpBackend_;
        };
    }));

    beforeEach(module('app'));

    beforeEach(inject(function ($controller, _$location_, $rootScope) {
        $location = _$location_;
        $scope = $rootScope.$new();
        NavigationCtrl = $controller('NavigationCtrl', {
            $location: $location,
            $scope: $scope
        });
    }));
});
