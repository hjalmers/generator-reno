angular.amd.basePath = angular.amd.basePath === '/' ? '/src/' : angular.amd.basePath;

angular.amd.module('app', [
    'ngRoute',
    'ngCookies',
    'templates-app',
    'angularLocalStorage',
    'module translate.localization from "app.translate.localization";'
    /* Add New Module Above */
])

.config(['$routeProvider', '$locationProvider', '$logProvider',
    function ($routeProvider, $locationProvider, $logProvider) {
        'use strict';

        $locationProvider.html5Mode(true).hashPrefix('!');

        if (window.isLegacy) {
            $routeProvider.
            when('/notsupported', {
                templateUrl: 'static-page/static-page.tpl.html',
                controller: 'NotSupportedCtrl'
            }).
            otherwise({
                redirectTo: '/notsupported'
            });
        } else {
            $routeProvider.
            when('/notallowed', {
                templateUrl: 'static-page/static-page.tpl.html',
                controller: 'NotAllowedCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
        }
    }
])

.controller('BaseCtrl', [
    '$scope', '$q', '$rootScope', '$location', 'storage', 'Localization', 'Authentication',
    function ($scope, $q, $rootScope, $location, config, storage, Localization, Authentication) {
        'use strict';

        function appLoaded($event, evtData) {
            $rootScope.$on('$routeChangeSuccess', function (event, next, current) {
                $scope.cssClass.logo = 'logo';
                $scope.$broadcast('logo:close');
            });
        }

        $scope.gettext = Localization.getText;
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

        Localization.setCurrentLanguage(storage.get('preferedLanguage') || config.get('accept-language'));

        $q.all([Localization.loadLocale(), Authentication.heartbeat()]).then(function () {
            $scope.appState = 'loaded';
            $rootScope.$broadcast('user:status', {
                after: 'app:loaded'
            });
        }, function () {
            $scope.appState = 'loaded';
            $rootScope.$broadcast('app:loaded');
        });
    }
]);

if (!window.isLegacy && window.loader) {
    window.loader.startLoader();
}
