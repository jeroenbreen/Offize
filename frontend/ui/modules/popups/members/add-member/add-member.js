define([
    'angular',
    './add-member-controller',
    './add-member-directive'
], function (
    angular,
    Controller,
    directive
) {
    "use strict";
    return angular.module('addMember', [])
        .controller('AddMemberController', Controller)
        .directive('addMember', directive)
});
