define([
    'require/text!./member.tpl'
], function (
    template
) {
    "use strict";

    function memberDirective() {
        return {
            restrict: 'E',
            controller: 'MemberController',
            replace: false,
            template: template,
            scope: {
                member: '=member'
            }
        };
    }

    return memberDirective;
});
