define([
    'angular',
    './document-controller',
    './document-directive',
    'jquery',
    'jqueryUi',
    'sortable'
], function(
    angular,
    Controller,
    directive,
    jquery,
    jqueryUi,
    sortable
) {
    "use strict";
    return angular.module('ofc.document', ['ui.sortable'])
        .controller('DocumentController', Controller)
        .directive('ofcDocument', directive)
        ;
});