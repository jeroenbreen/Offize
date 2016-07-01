define([
    'angular',
    './documents-controller',
    './documents-directive'
], function(
    angular,
    Controller,
    directive
) {
    "use strict";
    return angular.module('ofc.documents', [])
        .controller('DocumentsController', Controller)
        .directive('ofcDocuments', directive)
        ;
});