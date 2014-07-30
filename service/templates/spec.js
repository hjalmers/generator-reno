describe('Newly generated service "app.<%= name %>"', function () {
    'use strict';

    beforeEach(module('app.config'));
    beforeEach(module('app.<%= name %>'));

    it('should assign value to local variable', inject(function (config, <%= name %>) {
        expect(<%= name %>.<%= name %>).toEqual('Just created!');
    }));
});