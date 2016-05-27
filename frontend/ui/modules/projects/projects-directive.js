define([
    'require/text!./projects.tpl'
], function(
    template
) {
    "use strict";
    function screenDirective() {
        return {
            restrict: 'E',
            controller: 'ProjectsController',
            replace: false,
            template: template,
            scope: {
                model: '=ofcModel'
            }
        };
    }
    screenDirective.$inject = [];
    return screenDirective;
});
