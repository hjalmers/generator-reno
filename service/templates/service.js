angular.amd.module('app.<%= name %>', [])

.service('<%= name %>', [function () {
        'use strict';

  		this.<%= name %> = 'Just created!';
    }
]);