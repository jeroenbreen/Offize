define([
    'require/text!./contact-detail.tpl'
], function(
    template
) {
    "use strict";
    function contactDetailDirective() {
        return {
            restrict: 'E',
            controller: 'ContactDetailController',
            replace: false,
            template: template,
            scope: {
                model: '=ofcModel',
                office: '=ofcOffice'
            }
        };
    }
    contactDetailDirective.$inject = [];
    return contactDetailDirective;
});
