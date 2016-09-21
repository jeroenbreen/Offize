define([
    'angular',
    './distribution-controller',
    './distribution-directive'
], function(
    angular,
    Controller,
    directive
) {
    "use strict";
    return angular.module('ofc.distribution', [])
           .controller('DistributionController', Controller)
           .directive('ofcDistribution', directive)
           ;
});
