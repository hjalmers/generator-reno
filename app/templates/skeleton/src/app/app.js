angular.amd.basePath = angular.amd.basePath === '/' ? '/src/' : angular.amd.basePath;

angular.amd.module('app', [
    'ngRoute',
    'ngCookies',
    'templates-app',
    'angularLocalStorage',
    'module app.navigation from "app.navigation.index";',
    /* Add New Module Above */
])

.config(['$routeProvider', '$locationProvider', '$logProvider',
    function ($routeProvider, $locationProvider, $logProvider) {
        'use strict';

        $locationProvider.html5Mode(true).hashPrefix('!');

        if (window.isLegacy) {
            $routeProvider.
            otherwise({
                redirectTo: '/please-generate-initial-module-and-replace-this'
            });
        } else {
            $routeProvider.
            otherwise({
                redirectTo: '/please-generate-initial-module-and-replace-this'
            });
        }
    }
])

.controller('BaseCtrl', [
    '$scope', '$q', '$rootScope', '$location', 'storage',
    function ($scope, $q, $rootScope, $location, config, storage) {
        'use strict';

        function appLoaded($event, evtData) {
            $rootScope.$on('$routeChangeSuccess', function (event, next, current) {
                $scope.cssClass.logo = 'logo';
                $scope.$broadcast('logo:close');
            });
        }

        $scope.appState = 'not-loaded';
        $scope.cssClass = {
            appState: '',
            logo: 'logo'
        };

        $scope.setBaseCssClass = function (cssClass) {
            $scope.cssClass.baseClass = cssClass;
        };

        $scope.closeMenu = function ($event) {
            if (/expanded/.test($scope.cssClass.logo)) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope.$broadcast('logo:close');
            }
        };

        $scope.$on('app:state', function ($event, state) {
            switch (state) {
            case 'game:loaded':
            case 'games:loaded':
            case 'page:loaded':
                $scope.cssClass.appState = 'app-loaded';
                break;
            default:
                break;
            }
        });

        $scope.$on('logo:expand', function () {
            $scope.cssClass.logo = 'logo logo-expanded';
        });

        $scope.$on('logo:close', function () {
            $scope.cssClass.logo = 'logo';
        });

        $scope.$on('app:loaded', appLoaded);

        if (config.get('countryNotAllowed') === true) {
            $scope.appState = 'loaded';
            $rootScope.$broadcast('app:loaded');

            $location.path('/notallowed');
            return;
        }
    }
]).then(function (module) {
    'use strict';

    var $injector = angular.injector(['ng']);

    angular.resumeBootstrap();
});

if (!window.isLegacy && window.loader) {
    window.loader.startLoader();
}
