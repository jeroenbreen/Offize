define([
    'angular',
    './contact-detail-controller',
    './contact-detail-directive'
], function(
    angular,
    Controller,
    directive
) {
    "use strict";
    return angular.module('ofc.contactDetail', [])
           .controller('ContactDetailController', Controller)
           .directive('ofcContactDetail', directive)
           ;
});
