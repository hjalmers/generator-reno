angular.amd.module('app.navigation', [
    'angularLocalStorage',
])

.controller('NavigationCtrl', ['$scope', '$rootScope', '$location', 'storage',
    function ($scope, $rootScope, $location, storage) {
        'use strict';

        $scope.cssClass = {
            mainNavigation: 'main-navigation'
        };

        $scope.openMenu = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.cssClass.mainNavigation = 'main-navigation main-navigation-open';
            $scope.$emit('logo:expand');
        };

        $scope.toggleSubNav = function ($event, forceClose) {
            $event.preventDefault();
            $event.stopPropagation();

            if (/sub-nav-open/.test($scope.cssClass.mainNavigation) || forceClose) {
                $scope.cssClass.mainNavigation = $scope.cssClass.mainNavigation.replace(/sub-nav-open/, '');
            } else {
                $scope.cssClass.mainNavigation = $scope.cssClass.mainNavigation + ' sub-nav-open';
            }
        };

        $scope.toggleSearch = function ($event) {
            $scope.cssClass.mainNavigation = $scope.cssClass.mainNavigation + ' search-bar-open';
            $rootScope.$broadcast('search:toggle');
            if (/sub-nav-open/.test($scope.cssClass.mainNavigation)) {
                $scope.cssClass.mainNavigation = $scope.cssClass.mainNavigation.replace(/sub-nav-open/, '');
            }
        };

        function showNavigation() {
            if (/search-bar-open/.test($scope.cssClass.mainNavigation)) {
                $scope.cssClass.mainNavigation = $scope.cssClass.mainNavigation.replace(/search-bar-open/, '');
            } else {
                $scope.cssClass.mainNavigation = $scope.cssClass.mainNavigation + ' search-bar-open';
            }
        }

        $scope.$on('search:hide', showNavigation);

        $scope.$on('logo:close', function () {
            $scope.cssClass.mainNavigation = 'main-navigation';
        });

        $scope.$on('not:allowed', function () {
            $scope.cssClass.mainNavigation = 'not-allowed';
        });
    }
]);
