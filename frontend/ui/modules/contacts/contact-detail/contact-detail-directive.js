define([
    'require/text!./contact-detail.tpl'
], function(
    template
) {
    "use strict";
    function detailDirective() {
        return {
            restrict: 'E',
            controller: 'ContactDetailController',
            replace: false,
            template: template,
            scope: {
                model: '=ofcModel',
                office: '=ofcOffice',
                configuration: '=ofcConfiguration'
            }
        };
    }
    detailDirective.$inject = [];
    return detailDirective;
});
