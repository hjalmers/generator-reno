describe('app.<%= name %>', function () {
    'use strict';

    beforeEach(module('app.config'));
    beforeEach(module('app.<%= name %>'));

    it('should assign config to local variable', inject(function (config, <%= name %>) {
        expect(<%= name %>.<%= name %>).toEqual(config);
    }));
});