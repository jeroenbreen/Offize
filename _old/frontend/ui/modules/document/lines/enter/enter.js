define([
    'angular',
    './enter-controller',
    './enter-directive'
], function(
    angular,
    Controller,
    directive
) {
    "use strict";
    return angular.module('ofc.enter', [])
        .controller('EnterController', Controller)
        .directive('ofcEnter', directive)
        ;
});