define([
    'require/text!./member-filter.tpl'
], function (template) {
    "use strict";

    function memberFilterDirective() {
        return {
            restrict: 'E',
            controller: 'MemberFilterController',
            replace: false,
            template: template,
            scope: {
                current: '=current'
            }
        };
    }
    return memberFilterDirective;
});
