define([
    'angular',
    './detail-controller',
    './detail-directive'
], function(
    angular,
    Controller,
    directive
) {
    "use strict";
    return angular.module('ofc.detail', [])
           .controller('DetailController', Controller)
           .directive('ofcDetail', directive)
           ;
});
