define([
    'require/text!./add-project.tpl'
], function (
    template
) {
    "use strict";

    function addProjectDirective() {
        return {
            restrict: 'E',
            controller: 'AddProjectController',
            replace: false,
            template: template,
            scope: {}
        };
    }

    return addProjectDirective;
});
