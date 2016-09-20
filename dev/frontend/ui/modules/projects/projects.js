define([
    'angular',
    './projects-controller',
    './projects-directive',
    './detail/detail',
    './comments/comments',
    './hours/hours',
    './distribution/distribution'
], function(
    angular,
    Controller,
    directive,
    detailModule,
    commentsModule,
    hoursModule,
    distributionModule
) {
    "use strict";
    return angular.module('ofc.projects', [detailModule.name, commentsModule.name, hoursModule.name, distributionModule.name])
        .controller('ProjectsController', Controller)
        .directive('ofcProjects', directive)
        ;
});