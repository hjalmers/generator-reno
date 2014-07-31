describe('<%= name %>', function () {
  'use strict';

  var $compile, $templateCache, outerScope, scope, element;

  beforeEach(function () {
    module('app');
    inject(function ($rootScope, _$compile_, _$templateCache_) {
      outerScope = $rootScope.$new();
      $compile = _$compile_;
      $templateCache = _$templateCache_;
    });

    $templateCache.put('<%= modulename %>/<%= name %>.tpl.html', '<div></div>');
    element = $compile('<<%= name %>></<%= name %>>')(outerScope);
    outerScope.$digest();
    scope = element.isolateScope();
  });

  it('should have tests');
  
});