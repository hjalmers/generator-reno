angular.amd.module('app.<%= name %>', [
    'module app.config from "app.config";'
])

.service('<%= name %>', [
    'config',
    function (config) {
        'use strict';

  		this.<%= name %> = 'Just created!';
    }
]);