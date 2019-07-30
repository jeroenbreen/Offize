define([
    'require/text!./document-addresses.tpl'
], function (
    template
) {
    "use strict";

    function documentAddressesDirective() {
        return {
            restrict: 'E',
            controller: 'DocumentAddressesController',
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

    return documentAddressesDirective;
});
