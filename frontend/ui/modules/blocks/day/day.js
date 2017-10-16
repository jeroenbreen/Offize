define([
    'angular',
    './day-controller',
    './day-directive',
    './block/block',
    './todo/todo',
    'sortable'
], function (
    angular,
    Controller,
    directive,
    blockModule,
    todoModule,
    sortable
) {
    "use strict";
    return angular.module('day', [
        blockModule.name,
        todoModule.name,
        'ui.sortable'
    ])
        .controller('DayController', Controller)
        .directive('day', directive)
});
