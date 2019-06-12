define([
    'require/text!./project-sums.tpl'
], function (
    template
) {
    "use strict";

    function projectSumsDirective() {
        return {
            restrict: 'E',
            controller: 'ProjectSumsController',
            replace: false,
            template: template,
            scope: {}
        };
    }

    return projectSumsDirective;
});
