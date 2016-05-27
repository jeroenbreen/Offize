define([
    'require/text!./documents.tpl'
], function(
    template
) {
    "use strict";
    function documentsDirective() {
        return {
            restrict: 'E',
            controller: 'DocumentsController',
            replace: false,
            template: template,
            scope: {
                model: '=ofcModel'
            }
        };
    }
    documentsDirective.$inject = [];
    return documentsDirective;
});
