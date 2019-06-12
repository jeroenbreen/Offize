define([
    'angular',
    './line-tools-controller',
    './line-tools-directive'
], function (
    angular,
    Controller,
    directive
) {
    "use strict";
    return angular.module('lineTools', [])
        .controller('LineToolsController', Controller)
        .directive('lineTools', directive)
});
