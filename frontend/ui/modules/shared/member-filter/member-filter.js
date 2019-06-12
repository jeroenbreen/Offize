define([
    'angular',
    './member-filter-controller',
    './member-filter-directive'
], function (angular,
    Controller,
    directive) {
    "use strict";
    return angular.module('member-filter', [])
        .controller('MemberFilterController', Controller)
        .directive('memberFilter', directive)
});
