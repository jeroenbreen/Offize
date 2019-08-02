define([
    'require/text!./project.tpl'
], function (
    template
) {
    "use strict";

    function projectDirective() {
        return {
            restrict: 'E',
            controller: 'ProjectController',
            replace: false,
            template: template,
            scope: {
                project: '=project'
            }
        };
    }

    return projectDirective;
});
