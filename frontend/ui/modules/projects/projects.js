define([
    'angular',
    './project-sums/project-sums',
    './projects-filter/projects-filter',
    './project/project'
], function (
    angular,
    projectSumsModule,
    projectsFilterModule,
    projectModule
) {
    "use strict";
    return angular.module('projects', [
        projectSumsModule.name,
        projectsFilterModule.name,
        projectModule.name
    ])
});
