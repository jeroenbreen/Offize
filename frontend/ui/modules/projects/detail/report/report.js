define([
    'angular',
    './report-controller',
    './report-directive'
], function (angular,
    Controller,
    directive) {
    "use strict";
    return angular.module('report', [])
        .controller('ReportController', Controller)
        .directive('report', directive)
});
