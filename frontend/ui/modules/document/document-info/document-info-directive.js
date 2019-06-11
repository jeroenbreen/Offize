define([
    'require/text!./document-info.tpl'
], function (
    template
) {
    "use strict";

    function documentInfoDirective() {
        return {
            restrict: 'E',
            controller: 'DocumentInfoController',
            replace: false,
            template: template,
            scope: {
                document: '=document'
            }
        };
    }

    return documentInfoDirective;
});
