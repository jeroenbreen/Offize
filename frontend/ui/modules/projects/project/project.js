define([
    'angular',
    './project-controller',
    './project-directive'
], function (
    angular,
    Controller,
    directive
) {
    "use strict";
    return angular.module('project', [])
        .controller('ProjectController', Controller)
        .directive('project', directive)
});
