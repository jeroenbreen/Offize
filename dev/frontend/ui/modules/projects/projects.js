define([
    'angular',
    './projects-controller',
    './projects-directive',
    './detail/detail',
    './comments/comments',
    './hours/hours'
], function(
    angular,
    Controller,
    directive,
    detailModule,
    commentsModule,
    hoursModule
) {
    "use strict";
    return angular.module('ofc.projects', [detailModule.name, commentsModule.name, hoursModule.name])
           .controller('ProjectsController', Controller)
           .directive('ofcProjects', directive)
           ;
});
