define([
    'angular',
    './document-tools-controller',
    './document-tools-directive',
    './mails/mails'
], function (
    angular,
    Controller,
    directive,
    mailsModule
) {
    "use strict";
    return angular.module('documentTools', [
        mailsModule.name
    ])
        .controller('DocumentToolsController', Controller)
        .directive('documentTools', directive)
});
