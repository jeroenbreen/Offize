define([
    'angular',
    './add-project-controller',
    './add-project-directive'
], function (
    angular,
    Controller,
    directive
) {
    "use strict";
    return angular.module('addProject', [])
        .controller('AddProjectController', Controller)
        .directive('addProject', directive)
});
