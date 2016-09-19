define([
    'angular',
    './subtotal-controller',
    './subtotal-directive'
], function(
    angular,
    Controller,
    directive
) {
    "use strict";
    return angular.module('ofc.subtotal', [])
        .controller('SubtotalController', Controller)
        .directive('ofcSubtotal', directive)
        ;
});