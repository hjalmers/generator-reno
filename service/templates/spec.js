describe('Newly generated service "<%= name %>"', function () {
    'use strict';

    beforeEach(module('app.services.<%= name %>'));

    it('should assign value to local variable', inject(function (<%= name %>) {
        expect(<%= name %>.<%= name %>).toEqual('Just created!');
    }));
});