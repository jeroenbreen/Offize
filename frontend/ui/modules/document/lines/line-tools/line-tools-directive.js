define([
    'require/text!./line-tools.tpl'
], function (
    template
) {
    "use strict";

    function lineToolsDirective() {
        return {
            restrict: 'E',
            controller: 'LineToolsController',
            replace: false,
            template: template,
            scope: {
                document: '=document'
            }
        };
    }

    return lineToolsDirective;
});
