describe('config', function () {
    'use strict';

    var $httpBackend,
        _configProvider;

    beforeEach(module('app.config'));
    beforeEach(module(function (configProvider) {
        configProvider.set({
            monkey: 'apa'
        });

        _configProvider = configProvider;
    }));

    beforeEach(inject(function (_$httpBackend_) {
        $httpBackend = _$httpBackend_;
    }));

    describe('config with object', function () {
        it('should have access to config', inject(function (config)  {
            expect(config.get('monkey')).toBe('apa');
        }));
    });

    describe('config getPath/setPath', function () {
        beforeEach(function () {
            _configProvider.reset();
        });

        it('should get set path one level', inject(function (config)  {
            config.set('lvl1', 'one');
            expect(config.get('lvl1')).toBe('one');
        }));

        it('should get set path multi level', inject(function (config)  {
            config.set('lvl1.lvl2', 'two');
            expect(config.get('lvl1.lvl2')).toBe('two');
        }));

        it('should get set path with object and paths', inject(function (config)  {
            config.set('lvl1', 'one');
            expect(config.get('lvl1')).toBe('one');

            config.set('lvl1.lvl2', 'two');
            config.set('lvl1.lvl22', 'twentytwo');

            expect(config.get('lvl1')).toEqual({
                lvl2: 'two',
                lvl22: 'twentytwo'
            });

            config.set({
                lvl11: 'eleven'
            });
            expect(config.get('lvl1.lvl22')).toBe('twentytwo');
            expect(config.get('lvl11')).toBe('eleven');

            config.set({
                lvl1: {
                    lvl2: 'toto'
                }
            });

            expect(config.get('lvl1')).toEqual({
                lvl2: 'toto'
            });
        }));

        it('should get entire config', inject(function (config)  {
            config.set('lvl1', 'one');
            expect(config.get()).toEqual({
                lvl1: 'one'
            });
        }));
    });

    describe('configProvider with fetch', function () {
        beforeEach(function () {
            _configProvider.reset();
        });

        it('should have access to config after Config.ready is resolved', inject(function ($q, config)  {
            $httpBackend.expectGET('/path-to-config').respond({
                'apa': 'monkey'
            });

            config.load('/path-to-config');

            $q.when(config.ready).then(function () {
                expect(config.get('apa')).toBe('monkey');
            });

            $httpBackend.flush();
        }));
    });

    describe('configProvider with a mix of fetch and object', function () {
        beforeEach(function () {
            _configProvider.reset();
            _configProvider.set({
                'home': 'Duckburg'
            });
            _configProvider.set('age', 100);
        });

        it('should have access to config after Config.ready is resolved', inject(function ($q, config)  {
            $httpBackend.expectGET('/path-to-config').respond({
                'name': 'Scrooge'
            });

            $httpBackend.expectGET('/path-to-config-2').respond({
                'netWorth': 'five multiplujillion, nine impossibidillion, seven fantasticatrillion dollars and sixteen cents'
            });

            config.load('/path-to-config');
            config.load('/path-to-config-2');

            $q.when(config.ready).then(function () {
                expect(config.get('home')).toBe('Duckburg');
                expect(config.get('age')).toBe(100);
                expect(config.get('name')).toBe('Scrooge');
                expect(config.get('netWorth')).toBe('five multiplujillion, nine impossibidillion, seven fantasticatrillion dollars and sixteen cents');
            });

            $httpBackend.flush();
        }));
    });
});
