define([
    'angular',
    './document-addresses-controller',
    './document-addresses-directive'
], function (
    angular,
    Controller,
    directive
) {
    "use strict";
    return angular.module('documentAddresses', [])
        .controller('DocumentAddressesController', Controller)
        .directive('documentAddresses', directive)
});
