define([
    'require/text!./document-tools.tpl'
], function (
    template
) {
    "use strict";

    function documentToolsDirective() {
        return {
            restrict: 'E',
            controller: 'DocumentToolsController',
            replace: false,
            template: template,
            scope: {
                project: '=project',
                document: '=document'
            }
        };
    }

    return documentToolsDirective;
});
