define([
    'angular',
    './contacts-controller',
    './contacts-directive',
    './contact-detail/contact-detail'
], function(
    angular,
    Controller,
    directive,
    contactDetailModule
) {
    "use strict";
    return angular.module('ofc.contacts', [contactDetailModule.name])
           .controller('ContactsController', Controller)
           .directive('ofcContacts', directive)
           ;
});
