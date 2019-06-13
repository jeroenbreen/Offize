define([
    'angular',
    './mail-controller',
    './mail-directive'
], function (
    angular,
    Controller,
    directive
) {
    "use strict";
    return angular.module('mail', [])
        .controller('MailController', Controller)
        .directive('mail', directive)
});
