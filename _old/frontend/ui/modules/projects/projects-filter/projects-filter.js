define([
    'angular',
    './projects-filter-controller',
    './projects-filter-directive',
    'ui/modules/shared/member-filter/member-filter',
    'ui/modules/shared/contact-filter/contact-filter'
], function (
    angular,
    Controller,
    directive,
    memberFilterModule,
    contactFilterModule
) {
    "use strict";
    return angular.module('projectsFilter', [
        memberFilterModule.name,
        contactFilterModule.name
    ])
        .controller('ProjectsFilterController', Controller)
        .directive('projectsFilter', directive)
});
