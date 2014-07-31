.directive('<%= name %>', function () {
  'use strict';

  return {
    templateUrl: '<%= modulename %>/<%= markupname %>.tpl.html',
    restrict: 'A',
    replace: true,
  };
});
