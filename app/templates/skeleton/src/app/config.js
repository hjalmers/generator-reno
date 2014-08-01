/**
 * @ngdoc module
 * @name app.config
 * @module app.config
 * @description
 *
 * Provides a simple way to configure, load and access config settings across a app.
 */

angular.amd.module('app.config', [])

.provider('config', [
    /**
     * @ngdoc provider
     * @name configProvider
     * @module app.config
     *
     * @description
     * Used to add configuration values via `extend()` or load them from URL via `fetch()`.
     */
    function () {
        'use strict';
        /**
         * @ngdoc method
         * @name config#getPath
         *
         * @description
         * Empties current config
         */
        function getPath(path) {
            var steps = path ? path.split('.') : [],
                step = $window.configCache.appConfig,
                key;

            while (steps.length && step) {
                key = steps.shift();
                step = step.hasOwnProperty(key) ? step[key] : null;
            }

            return step;
        }
        this.get = getPath;

        /**
         * @ngdoc method
         * @name config#setPath
         *
         * @description
         * Empties current config
         */
        function setPath(path, value) {
            var steps,
                step,
                key;

            if (typeof path === 'string') {
                steps = path.split('.');
                step = $window.configCache.appConfig;

                while (steps.length > 1 && step) {
                    key = steps.shift();
                    if (!step.hasOwnProperty(key) || typeof step[key] !== 'object') {
                        step[key] = {};
                    }

                    step = step[key];
                }

                key = steps.shift();
                step[key] = value;
            } else {
                angular.extend($window.configCache.appConfig, path, true);
            }
        }
        this.set = setPath;

        /**
         * @ngdoc method
         * @name config#reset
         *
         * @description
         * Empties current configuration data.
         */
        function reset() {
            $window.configCache.appConfig = {};
        }
        this.reset = reset;

        var $injector = angular.injector(['ng']),
            $window = $injector.get('$window'),
            running = false;

        $window.configCache = $window.configCache || {
            appConfig: {}
        };

        /**
         * @ngdoc service
         * @name config
         * @module app.config
         *
         * @description
         * Service for accessing conigurations added/fetched during config phase by {@link app.config.configProvider configProvider}.
         *
         * @example

            Extend appConfig by `extend` or load external json. Fetched config will be avalible one `config.ready` promise is resolved.
            <example module="exampleModule" deps="/src/ctx/config.js">
                <file name="index.html">
                    <div ng-controller="MainCtrl">
                        <p>Name: {{name}}</p>
                        <p>Net worth: {{netWorth}}</p>
                    </div>
                </file>
                <file name="script.js">
                    angular.amd.module('exampleModule', ['app.config'])
                    .config(['configProvider', function (configProvider) {
                        configProvider.extend('name', 'Scrooge');
                        configProvider.fetch('config.json');
                    }])
                    .controller('MainCtrl', ['$scope', '$q', 'config', function ($scope, $q, config) {
                        $scope.name = config.appConfig.name;

                        $q.when(config.ready).then(function () {
                            $scope.netWorth = config.appConfig.netWorth;
                        });
                    }]).then(function () {
                        angular.resumeBootstrap();
                    });
                </file>
                <file name="config.json">
                    {"netWorth":"five multiplujillion, nine impossibidillion, seven fantasticatrillion dollars and sixteen cents"}
                </file>
            </example>
         */

        // TODO: $templateCache is for docs example only, need a way around it.
        this.$get = ['$q', '$http', '$templateCache',
            function ($q, $http, $templateCache) {
                function fetchRemoteConfig(url) {
                    running = running || $q.defer();
                    return $http({
                        method: 'get',
                        url: url
                    }).then(function (response) {
                        setPath(response.data);
                    });
                }

                var config = {
                    get: getPath,
                    set: setPath,
                    load: fetchRemoteConfig,
                    reset: reset
                };

                /**
                 * @ngdoc property
                 * @name config#ready
                 * @description
                 * Promise of fetching remote config.
                 */
                Object.defineProperty(config, 'ready', {
                    get: function () {
                        return running === false ? true : running.promise;
                    }
                });

                return config;
            }
        ];
    }
]);
