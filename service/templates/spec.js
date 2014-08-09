describe('Newly generated service "app.services.<%= name %>"', function () {
    'use strict';

    beforeEach(module('app.services.<%= name %>'));

    it('should assign value to local variable', inject(function (config, <%= name %>) {
        expect(<%= name %>.<%= name %>).toEqual('Just created!');
    }));
});