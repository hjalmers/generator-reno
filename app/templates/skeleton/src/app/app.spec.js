describe('BaseCtrl', function () {
    'use strict';

    var BaseCtrl, $location, $scope, $httpBackend,
        evt = {
            stopPropagation: angular.noop,
            preventDefault: angular.noop
        };

    beforeEach(module(function () {
        return function (_$httpBackend_) {
            $httpBackend = _$httpBackend_;
            $httpBackend.whenGET('/assets/lang/en.json').respond();
            $httpBackend.whenGET('/assets/lang/sv.json').respond();
            $httpBackend.whenGET('/api/auth/get/accountstatus').respond();
        };
    }));

    beforeEach(module('angularLocalStorage'));
    beforeEach(module('app'));

    beforeEach(inject(function ($controller, _$location_, $rootScope) {
        $location = _$location_;
        $scope = $rootScope.$new();
        BaseCtrl = $controller('BaseCtrl', {
            $location: $location,
            $scope: $scope
        });
    }));

    it('should load config before bootstrap', inject(function ($controller) {
        expect(BaseCtrl).toBeTruthy();
    }));

    it('should remove logo-expanded and broadcast "logo:close" when closeMenu is invoked', inject(function ($rootScope) {
        spyOn($scope, '$broadcast');

        $scope.cssClass.logo = 'logo logo-expanded';
        $scope.closeMenu(evt);

        $rootScope.$apply();

        expect($scope.$broadcast).toHaveBeenCalledWith('logo:close');
    }));

    it('should set Localization locale to what\'s saved in storage', inject(function ($controller, storage, Localization) {
        spyOn(Localization, 'setCurrentLanguage');
        storage.set('preferedLanguage', 'sv');

        $controller('BaseCtrl', {
            $location: $location,
            $scope: $scope
        });

        expect(Localization.setCurrentLanguage).toHaveBeenCalledWith('sv');
    }));
});
