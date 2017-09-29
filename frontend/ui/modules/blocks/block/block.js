define([
    'angular',
    './block-controller',
    './block-directive'
], function (
    angular,
    Controller,
    directive
) {
    "use strict";
    return angular.module('block', [])
        .controller('BlockController', Controller)
        .directive('block', directive)
});
