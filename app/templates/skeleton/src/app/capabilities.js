angular.amd.module('app.capabilities', [
    'module app.config from "app.config";'
])

.constant('DEFAULT_CAPABILITIES', {
    languages: ['en', 'sv', 'no'],
    playForFun: true,
    playForReal: true,
    quickDeposit: true,
    gameProviders: {
        Betsoft: true,
        NetEnt: true,
        OGS: true
    }
})

.service('capabilities', [
    'config', 'DEFAULT_CAPABILITIES',
    function (config, DEFAULT_CAPABILITIES) {
        'use strict';

        this.refresh = function () {
            angular.extend(this, DEFAULT_CAPABILITIES, config.get('capabilities') || {});
        };

        this.refresh();
    }
]);
