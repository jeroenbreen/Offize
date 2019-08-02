define([
    'require/text!./members.tpl'
], function (
    template
) {
    "use strict";

    function membersDirective() {
        return {
            restrict: 'E',
            controller: 'MembersController',
            replace: false,
            template: template,
            scope: {}
        };
    }

    return membersDirective;
});
