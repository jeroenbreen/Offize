define([
    'angular',
    './app-controller',
    './app-directive',
    './modules/document/document'
], function(
    angular,
    Controller,
    directive,
    documentModule
) {
    "use strict";
    return angular.module('OfficeModel', [documentModule.name])
    .controller('AppController', Controller)
    .directive('office', directive)
});
