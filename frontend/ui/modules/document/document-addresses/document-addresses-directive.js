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
            replace: false,
            template: template,
            scope: {
                document: '=document'
            }
        };
    }

    return documentAddressesDirective;
});
