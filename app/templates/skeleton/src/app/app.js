angular.amd.basePath = angular.amd.basePath === '/' ? '/src/' : angular.amd.basePath;

angular.amd.module('app', [
    'ngRoute',
    'ngCookies',
    'templates-app',
    'angularLocalStorage'
    /* Add New Module Above */
])

.config(['$routeProvider', '$locationProvider', '$logProvider', 'configProvider',
    function ($routeProvider, $locationProvider, $logProvider, configProvider) {
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

        $logProvider.debugEnabled(!configProvider.get('production'));
    }
])

.controller('BaseCtrl', [
    '$scope', '$q', '$rootScope', '$location', 'config', 'storage', 'Localization', 'Authentication', 'User', 'Tracking',
    function ($scope, $q, $rootScope, $location, config, storage, Localization, Authentication, User, Tracking) {
        'use strict';

        function appLoaded($event, evtData) {
            $rootScope.$on('$routeChangeSuccess', function (event, next, current) {
                $scope.cssClass.logo = 'logo';
                $scope.$broadcast('logo:close');

                Tracking.track.pageView();

                if (config.get('countryNotAllowed') === true) {
                    $location.path('/notallowed');
                } else {
                    $rootScope.$broadcast('user:status');
                }
            });
        }

        $scope.gettext = Localization.getText;
        $scope.User = User;
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
]).then(function (module) {
    'use strict';

    var $injector = angular.injector(['ng', 'app.config']),
        config = $injector.get('config');

    config.set('paymentMethods', {
        'GarboSE': ['creditCard', 'swedbank', 'handelsbanken', 'nordea', 'seb', 'paysafe'],
        'GarboEU': ['creditCard', 'trustly', 'paysafe']
    });

    config.set('localization', {
        'sv': {
            locale: 'sv',
            currency: 'SEK'
        },
        'en': {
            locale: 'en',
            currency: 'EUR'
        },
        'no': {
            locale: 'no',
            currency: 'EUR'
        }
    });

    config.set('depositAmounts', [30, 50, 100]);
    config.set('minWithdrawAmount', 30);

    config.load('/api/get/config').then(function () {
        angular.resumeBootstrap();
    }, function (reason) {
        if (reason.data && reason.data.error && reason.data.error.error === 'countryNotAllowed') {
            config.set('countryNotAllowed', true);
        }

        angular.resumeBootstrap();
    });
});

if (!window.isLegacy && window.loader) {
    window.loader.startLoader();
}
