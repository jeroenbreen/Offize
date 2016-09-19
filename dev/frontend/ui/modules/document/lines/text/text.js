define([
    'angular',
    './text-controller',
    './text-directive'
], function(
    angular,
    Controller,
    directive
) {
    "use strict";
    return angular.module('ofc.text', [])
        .controller('TextController', Controller)
        .directive('ofcText', directive)
        ;
});