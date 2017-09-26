define([
    'angular',
    './document-controller',
    './document-directive',
    './lines/line/line',
    'jquery',
    'jqueryUi',
    'sortable'
], function(
    angular,
    Controller,
    directive,
    lineModule,
    jquery,
    jqueryUi,
    sortable
) {
    "use strict";
    return angular.module('ofc.document', [
        lineModule.name,
        'ui.sortable'
    ])
        .controller('DocumentController', Controller)
        .directive('ofcDocument', directive)
        ;
});