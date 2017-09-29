define([
    'angular',
    './block-detail-controller',
    './block-detail-directive',
    './clock/clock'
], function (
    angular,
    Controller,
    directive,
    clockModule
) {
    "use strict";
    return angular.module('blockDetail', [
        clockModule.name
    ])
        .controller('BlockDetailController', Controller)
        .directive('blockDetail', directive)
});
