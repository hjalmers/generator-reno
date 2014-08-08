angular.amd.module('app.<%= name %>', [])

.service('<%= name %>', [function (config) {
        'use strict';

  		this.<%= name %> = 'Just created!';
    }
]);