define([
    'angular',
    './activity-controller',
    './activity-directive'
], function (angular,
    Controller,
    directive) {
    "use strict";
    return angular.module('activity', [])
        .controller('ActivityController', Controller)
        .directive('activity', directive)
});
