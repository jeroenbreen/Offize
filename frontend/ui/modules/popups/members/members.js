define([
    'angular',
    './members-controller',
    './members-directive',
    './member/member',
    './add-member/add-member'
], function (
    angular,
    Controller,
    directive,
    memberModule,
    addMemberModule
) {
    "use strict";
    return angular.module('members', [
        memberModule.name,
        addMemberModule.name
    ])
        .controller('MembersController', Controller)
        .directive('members', directive)
});
