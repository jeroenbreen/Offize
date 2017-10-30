define([
    'angular',
    './contact-filter-controller',
    './contact-filter-directive'
], function (angular,
    Controller,
    directive) {
    "use strict";
    return angular.module('contact-filter', [])
        .controller('ContactFilterController', Controller)
        .directive('contactFilter', directive)
});
