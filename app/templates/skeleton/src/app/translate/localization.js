angular.amd.module('translate.localization', [
    'module app.config from "app.config"',
    'module app.capabilities from "app.capabilities";'
])

.service('Localization', ['$http', '$rootScope', '$q', 'config', 'capabilities',
    function ($http, $rootScope, $q, config, capabilities) {
        'use strict';

        function findText(key) {
            var path = key.split('.'),
                node = languageDict;

            if (!path) {
                return '';
            }

            while (path.length) {
                node = node[path.shift()];
                if (!node || typeof node === 'string') {
                    return node;
                }
            }

            return node;
        }

        function substituteText(txt, sub) {
            if (!sub) {
                return txt;
            }

            var subText = txt,
                re,
                x;

            for (x in sub) {
                if (sub.hasOwnProperty(x)) {
                    re = new RegExp('(\\[' + x.toUpperCase() + '\\])', 'gi');
                    subText = subText.replace(re, sub[x]);
                }
            }

            return subText;
        }

        var userCountry = config.get('country'),
            defaultLanguage = 'en',
            isLanguageLoaded = false,
            getTextCache = {},
            languageDict = {};

        this.config = config.get('localization') || {
            'en': {
                locale: 'en',
                currency: 'EUR'
            }
        };

        this.current = this.config[defaultLanguage];

        this.setCurrentLanguage = function (acceptLanguageStr) {
            if (!acceptLanguageStr) {
                return;
            }

            var acceptLanguages = acceptLanguageStr.replace(/(;[^,]+)/g, '').toLowerCase().split(','),
                langCode,
                userLocale;

            acceptLanguages.forEach(angular.bind(this, function (acceptLanguage) {
                langCode = acceptLanguage.split('-')[0];
                if (!userLocale && this.config.hasOwnProperty(langCode) && (!capabilities.languages || capabilities.languages.indexOf(langCode))) {
                    userLocale = this.config[langCode];
                }
            }));

            this.current = userLocale || this.current;
        };

        this.getText = function (key, defaultText, sub) {
            sub = typeof defaultText === 'object' ? defaultText : sub;
            if (isLanguageLoaded) {
                return substituteText(findText(key) || defaultText, sub);
            } else if (getTextCache.hasOwnProperty(key)) {
                return getTextCache[key].promise;
            } else {
                var defer = $q.defer();
                defer.promise.then((function (k, d, s) {
                    return function () {
                        return substituteText(findText(k) || d, s);
                    };
                }(key, defaultText, sub)));
                getTextCache[key] = defer;
                return defer.promise;
            }
        };

        this.loadLocale = function () {
            return $http.get('/assets/lang/' + this.current.locale + '.json').then(function (response) {
                isLanguageLoaded = true;
                languageDict = angular.fromJson(response.data);
            }, function () {
                $rootScope.$broadcast('app:error', {
                    message: 'Error loading locale:' + this.currentLanguage.locale
                });
            });
        };
    }
]);
