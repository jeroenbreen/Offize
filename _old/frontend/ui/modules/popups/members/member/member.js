define([
    'angular',
    './member-controller',
    './member-directive'
], function (
    angular,
    Controller,
    directive
) {
    "use strict";
    return angular.module('member', [])
        .controller('MemberController', Controller)
        .directive('member', directive)
});
