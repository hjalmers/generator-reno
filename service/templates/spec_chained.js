describe('Newly generated service "<%= name %>"', function () {
    'use strict';

    beforeEach(module('app.<%= modulename %>'));

    it('should assign value to local variable', inject(function (config, <%= name %>) {
        expect(<%= name %>.<%= name %>).toEqual('Just created!');
    }));
});