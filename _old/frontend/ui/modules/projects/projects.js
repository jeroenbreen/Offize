define([
    'angular',
    './project-sums/project-sums',
    './projects-filter/projects-filter',
    './project/project',
    './add-project/add-project'
], function (
    angular,
    projectSumsModule,
    projectsFilterModule,
    projectModule,
    addProjectModule
) {
    "use strict";
    return angular.module('projects', [
        projectSumsModule.name,
        projectsFilterModule.name,
        projectModule.name,
        addProjectModule.name
    ])
});
