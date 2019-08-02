define([
    'angular',
    './count-controller',
    './count-directive'
], function(
    angular,
    Controller,
    directive
) {
    "use strict";
    return angular.module('ofc.count', [])
        .controller('CountController', Controller)
        .directive('ofcCount', directive)
        ;
});