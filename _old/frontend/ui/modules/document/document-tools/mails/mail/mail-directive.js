define([
    'require/text!./mail.tpl'
], function (
    template
) {
    "use strict";

    function mailDirective() {
        return {
            restrict: 'E',
            controller: 'MailController',
            replace: false,
            template: template,
            scope: {
                mail: '=mail'
            }
        };
    }

    return mailDirective;
});
