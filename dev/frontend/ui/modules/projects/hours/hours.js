define([
    'angular',
    './hours-controller',
    './hours-directive'
], function(
    angular,
    Controller,
    directive
) {
    "use strict";
    return angular.module('ofc.hours', [])
           .controller('HoursController', Controller)
           .directive('ofcHours', directive)
           ;
});
