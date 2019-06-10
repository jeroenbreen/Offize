define([
    'angular',
    './document-tools-controller',
    './document-tools-directive'
], function (
    angular,
    Controller,
    directive
) {
    "use strict";
    return angular.module('documentTools', [])
        .controller('DocumentToolsController', Controller)
        .directive('documentTools', directive)
});
