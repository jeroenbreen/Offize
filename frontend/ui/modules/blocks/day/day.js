define([
    'angular',
    './day-controller',
    './day-directive',
    './block/block',
    'sortable'
], function (
    angular,
    Controller,
    directive,
    blockModule,
    sortable
) {
    "use strict";
    return angular.module('day', [
        blockModule.name,
        'ui.sortable'
    ])
        .controller('DayController', Controller)
        .directive('day', directive)
});
