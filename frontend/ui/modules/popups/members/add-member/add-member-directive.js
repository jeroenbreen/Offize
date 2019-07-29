define([
    'require/text!./add-member.tpl'
], function (
    template
) {
    "use strict";

    function addMemberDirective() {
        return {
            restrict: 'E',
            controller: 'AddMemberController',
            replace: false,
            template: template,
            scope: {}
        };
    }

    return addMemberDirective;
});
