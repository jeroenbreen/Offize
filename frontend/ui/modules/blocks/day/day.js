define([
    'angular',
    './day-controller',
    './day-directive',
    './block/block'
], function (
angular,
    Controller,
    directive,
    blockModule
) {
    "use strict";
    return angular.module('day', [
        blockModule.name
    ])
        .controller('DayController', Controller)
        .directive('day', directive)
});
