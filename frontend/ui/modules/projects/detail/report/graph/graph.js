define([
    'angular',
    './graph-controller',
    './graph-directive'
], function (
    angular,
    Controller,
    directive
) {
    "use strict";
    return angular.module('graph', [])
        .controller('GraphController', Controller)
        .directive('graph', directive)
});
