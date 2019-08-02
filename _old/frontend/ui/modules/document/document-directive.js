define([
    'require/text!./document.tpl'
], function(
    template
) {
    "use strict";
    function documentDirective() {
        return {
            restrict: 'E',
            controller: 'DocumentController',
            replace: false,
            template: template,
            scope: {
                project: '=project',
                document: '=document'
            }
        };
    }
    documentDirective.$inject = [];
    return documentDirective;
});
