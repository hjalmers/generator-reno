angular.module('app.directives.<%= name %>').directive('<%= name %>', function () {
  'use strict';

  return {
    templateUrl: '<%= name %>/<%= name %>.tpl.html',
    restrict: 'A',
    replace: true,
  };
});
