define([
    'angular',
    './project-sums-controller',
    './project-sums-directive'
], function (
    angular,
    Controller,
    directive
) {
    "use strict";
    return angular.module('projectSums', [])
        .controller('ProjectSumsController', Controller)
        .directive('projectSums', directive)
});
