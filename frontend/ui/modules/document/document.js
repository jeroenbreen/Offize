define([
    'angular',
    './document-controller',
    './document-directive',
    './lines/line/line',
    './job-selector/job-selector',
    'jquery',
    'jqueryUi',
    'sortable'
], function(
    angular,
    Controller,
    directive,
    lineModule,
    jobSelectorModule,
    jquery,
    jqueryUi,
    sortable
) {
    "use strict";
    return angular.module('ofc.document', [
        lineModule.name,
        jobSelectorModule.name,
        'ui.sortable'
    ])
        .controller('DocumentController', Controller)
        .directive('ofcDocument', directive)
        ;
});