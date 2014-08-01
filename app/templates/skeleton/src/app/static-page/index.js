angular.amd.module('app.static-page', [
    'module translate.localization from "app.translate.localization";',
    'module app.resource.user from "app.resource.user";'
])

.config(['$routeProvider',
    function ($routeProvider) {
        'use strict';

        $routeProvider
            .when('/page/:markdownFile', {
                templateUrl: 'static-page/static-page.tpl.html',
                controller: 'StaticPageCtrl'
            });
    }
])

.controller('StaticPageCtrl', ['$scope', '$http', '$compile', '$routeParams', '$timeout', 'Localization', 'User',
    function ($scope, $http, $compile, $routeParams, $timeout, Localization, User) {
        'use strict';

        function parseAndShowContent(response) {
            var converter = new window.Showdown.converter(),
                html = converter.makeHtml(response.data),
                elem;

            $scope.pageContent = html;
        }

        function contentFailedToLoad(content) {
            $scope.pageContent = '<h1>Failed to load content</h1>';
        }

        function boot() {
            $http.get('/content/' + Localization.current.locale + '/' + $routeParams.markdownFile + '.md').then(parseAndShowContent, contentFailedToLoad);
        }

        $scope.pageContent = '';

        $scope.requestSupport = function ($event) {
            var payload = {
                'Firstname': User.me ? User.me.Firstname : $scope.firstname,
                'Lastname': User.me ? User.me.Lastname : $scope.lastname,
                'Email': User.me ? User.me.AccountName : $scope.email,
                'Mobile': User.me ? User.me.Mobile : $scope.mobile,
                'Message': $scope.message,
                'AccountId': User.me ? User.me.AccountID : 0,
                'UserAgent': window.navigator.userAgent
            };

            $http.post('/api/send/support', payload).then(function () {
                $scope.message = '';

                $scope.$emit('feedback:show', {
                    title: $scope.gettext('static.thanksTitle'),
                    text: $scope.gettext('static.thanks')
                });
            }, function (reason) {
                $scope.$emit('feedback:show', {
                    title: $scope.gettext('feedback.errorHeadline'),
                    text: reason.message
                });
            });
        };

        $scope.setBaseCssClass('static-page');
        if ($scope.$parent.appState === 'loaded') {
            boot();
        } else {
            $scope.$on('app:loaded', boot);
            $scope.$emit('app:state', 'page:loaded');
        }
    }
])

.directive('bindStaticHtml', function ($compile) {
    'use strict';

    return function ($scope, $element, $attrs) {
        var compile = function (newHTML) {
            newHTML = $compile(newHTML)($scope);
            $element.html('').append(newHTML);
        };

        var htmlName = $attrs.bindStaticHtml;

        $scope.$watch(htmlName, function (newHTML) {
            if (newHTML) {
                compile(newHTML);
            }
        });

    };
});
