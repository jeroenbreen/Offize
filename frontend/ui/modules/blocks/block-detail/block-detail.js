define([
    'angular',
    './block-detail-controller',
    './block-detail-directive',
    './activity/activity'
], function (
    angular,
    Controller,
    directive,
    activityModule
) {
    "use strict";
    return angular.module('blockDetail', [
        activityModule.name
    ])
        .controller('BlockDetailController', Controller)
        .directive('blockDetail', directive)
});
