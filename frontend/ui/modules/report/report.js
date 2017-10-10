define([
    'angular',
    './report-controller',
    './report-directive',
    './graph/graph'
], function (angular,
    Controller,
    directive,
    graphModule
) {
    "use strict";
    return angular.module('report', [
        graphModule.name
    ])
        .controller('ReportController', Controller)
        .directive('report', directive)
});
