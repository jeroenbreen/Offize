define([
    'angular',
    './document-controller',
    './document-directive',
    './lines/line/line',
    './document-tools/document-tools',
    'jquery',
    'jqueryUi',
    'sortable'
], function(
    angular,
    Controller,
    directive,
    lineModule,
    documentTools,
    jquery,
    jqueryUi,
    sortable
) {
    "use strict";
    return angular.module('ofc.document', [
        lineModule.name,
        documentTools.name,
        'ui.sortable'
    ])
        .controller('DocumentController', Controller)
        .directive('ofcDocument', directive);
});