.directive('<%= name %>', function () {
  'use strict';

  return {
    templateUrl: '<%= modulename %>/<%= name %>.tpl.html',
    restrict: 'A',
    replace: true,
  };
});
