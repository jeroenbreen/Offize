define([
    'angular',
    './mails-controller',
    './mails-directive',
    './mail/mail'
], function (
    angular,
    Controller,
    directive,
    mailModule
) {
    "use strict";
    return angular.module('mails', [
        mailModule.name
    ])
        .controller('MailsController', Controller)
        .directive('mails', directive)
});
