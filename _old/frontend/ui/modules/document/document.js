define([
    'angular',
    './document-controller',
    './document-directive',
    './document-info/document-info',
    './document-addresses/document-addresses',
    './lines/line/line',
    './lines/line-tools/line-tools',
    './document-tools/document-tools',
    'jquery',
    'jqueryUi',
    'sortable'
], function(
    angular,
    Controller,
    directive,
    documentInfoModule,
    documentAddressesModule,
    lineModule,
    lineToolsModule,
    documentTools,
    jquery,
    jqueryUi,
    sortable
) {
    "use strict";
    return angular.module('ofc.document', [
        documentInfoModule.name,
        documentAddressesModule.name,
        lineModule.name,
        lineToolsModule.name,
        documentTools.name,
        'ui.sortable'
    ])
        .controller('DocumentController', Controller)
        .directive('ofcDocument', directive);
});