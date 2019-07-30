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
            replace: true,
            template: template,
            scope: {
                document: '=document',
                template: '=template',
                scale: '=scale',
                getSize: '=getSize'
            }
        };
    }

    return documentInfoDirective;
});
