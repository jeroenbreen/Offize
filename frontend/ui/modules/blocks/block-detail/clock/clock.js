define([
    'angular',
    './clock-controller',
    './clock-directive'
], function (angular,
    Controller,
    directive) {
    "use strict";
    return angular.module('clock', [])
        .controller('ClockController', Controller)
        .directive('clock', directive)
});
