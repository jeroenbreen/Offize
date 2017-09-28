define([
    'angular',
    './job-selector-controller',
    './job-selector-directive'
], function (angular,
    Controller,
    directive) {
    "use strict";
    return angular.module('jobSelector', [])
        .controller('JobSelectorController', Controller)
        .directive('jobSelector', directive)
});
