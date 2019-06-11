define([
    'angular',
    './mail-popup-controller',
    './mail-popup-directive'
], function (
    angular,
    Controller,
    directive
) {
    "use strict";
    return angular.module('mailPopup', [])
        .controller('MailPopupController', Controller)
        .directive('mailPopup', directive)
});
