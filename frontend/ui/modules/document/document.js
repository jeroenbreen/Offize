define([
    'angular',
    './document-controller',
    './document-directive',
    './lines/amount/amount',
    './lines/count/count',
    './lines/enter/enter',
    './lines/subtotal/subtotal',
    './lines/text/text',
    'jquery',
    'jqueryUi',
    'sortable'
], function(
    angular,
    Controller,
    directive,
    amountModule,
    countModule,
    enterModule,
    subtotalModule,
    textModule,
    jquery,
    jqueryUi,
    sortable
) {
    "use strict";
    return angular.module('ofc.document', ['ui.sortable', amountModule.name, countModule.name, enterModule.name, subtotalModule.name, textModule.name])
        .controller('DocumentController', Controller)
        .directive('ofcDocument', directive)
        ;
});