define([
    'angular',
    './document-controller',
    './document-directive',
    './document-info/document-info',
    './lines/line/line',
    './document-tools/document-tools',
    'jquery',
    'jqueryUi',
    'sortable'
], function(
    angular,
    Controller,
    directive,
    documentInfoModule,
    lineModule,
    documentTools,
    jquery,
    jqueryUi,
    sortable
) {
    "use strict";
    return angular.module('ofc.document', [
        documentInfoModule.name,
        lineModule.name,
        documentTools.name,
        'ui.sortable'
    ])
        .controller('DocumentController', Controller)
        .directive('ofcDocument', directive);
});