angular.amd.module('app.navigation', [
    'angularLocalStorage',
    'module app.capabilities from "app.capabilities";',
    'module translate.localization from "app.translate.localization";',
    'module app.resource.user from "app.resource.user";'
])

.controller('NavigationCtrl', ['$scope', '$rootScope', '$location', 'storage', 'capabilities', 'Localization', 'User',
    function ($scope, $rootScope, $location, storage, capabilities, Localization, User) {
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

        $scope.goToDeposit = function ($event) {
            var path = $location.path();
            if (capabilities.quickDeposit && storage.get('canQuickDeposit') && (path == '/playinstyle' || path === '/account' || path.substring(0, 5) === '/play')) {
                $event.preventDefault();
                $event.stopPropagation();
                $rootScope.$broadcast('quickDeposit:open');
                $rootScope.$broadcast('logo:close');
            }
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
