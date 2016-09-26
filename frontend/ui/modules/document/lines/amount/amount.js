define([
    'angular',
    './amount-controller',
    './amount-directive'
], function(
    angular,
    Controller,
    directive
) {
    "use strict";
    return angular.module('ofc.amount', [])
        .controller('AmountController', Controller)
        .directive('ofcAmount', directive)
        ;
});