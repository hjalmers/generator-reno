angular.amd.module('app.services.<%= name %>', [])

.service('<%= name %>', [function () {
        'use strict';

  		this.<%= name %> = 'Just created!';
    }
]);