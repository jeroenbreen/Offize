define([
    'angular',
    './line-controller',
    './line-directive',
    './../amount/amount',
    './../count/count',
    './../enter/enter',
    './../subtotal/subtotal',
    './../text/text'
], function (angular,
    Controller,
    directive,
    amountModule,
    countModule,
    enterModule,
    subtotalModule,
    textModule
) {
    "use strict";
    return angular.module('line', [
        amountModule.name,
        countModule.name,
        enterModule.name,
        subtotalModule.name,
        textModule.name
    ])
        .controller('LineController', Controller)
        .directive('line', directive)
});
