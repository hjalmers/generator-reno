describe('app.capabilities', function () {
    'use strict';

    beforeEach(module('app.config'));
    beforeEach(module('app.capabilities'));
    it('should override DEFAULT_CAPABILITIES with config', inject(function (config, capabilities) {
        expect(capabilities.languages).toEqual(['en', 'sv', 'no']);
        config.set('capabilities', {
            languages: ['en']
        });

        capabilities.refresh();
        expect(capabilities.languages).toEqual(['en']);
    }));
});
