define([
    'angular',
    './document-info-controller',
    './document-info-directive'
], function (
    angular,
    Controller,
    directive
) {
    "use strict";
    return angular.module('documentInfo', [])
        .controller('DocumentInfoController', Controller)
        .directive('documentInfo', directive)
});
