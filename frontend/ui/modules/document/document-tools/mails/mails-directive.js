define([
    'require/text!./mails.tpl'
], function (
    template
) {
    "use strict";

    function mailsDirective() {
        return {
            restrict: 'E',
            controller: 'MailsController',
            replace: false,
            template: template,
            scope: {
                document: '=document'
            }
        };
    }

    return mailsDirective;
});
