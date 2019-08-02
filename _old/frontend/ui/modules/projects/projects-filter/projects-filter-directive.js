define([
    'require/text!./projects-filter.tpl'
], function (
    template
) {
    "use strict";

    function projectsFilterDirective() {
        return {
            restrict: 'E',
            controller: 'ProjectsFilterController',
            replace: false,
            template: template,
            scope: {}
        };
    }

    return projectsFilterDirective;
});
