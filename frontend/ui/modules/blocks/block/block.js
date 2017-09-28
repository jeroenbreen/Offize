define([
    'angular',
    './block-controller',
    './block-directive',
    './clock/clock'
], function (
    angular,
    Controller,
    directive,
    clockModule
) {
    "use strict";
    return angular.module('block', [
        clockModule.name
    ])
        .controller('BlockController', Controller)
        .directive('block', directive)
});
