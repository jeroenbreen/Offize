define([
    'require/text!./mail-popup.tpl'
], function (
    template
) {
    "use strict";

    function mailPopupDirective() {
        return {
            restrict: 'E',
            controller: 'MailPopupController',
            replace: false,
            template: template,
            scope: {}
        };
    }

    return mailPopupDirective;
});
