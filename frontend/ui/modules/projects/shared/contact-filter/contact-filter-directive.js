define([
    'require/text!./contact-filter.tpl'
], function (template) {
    "use strict";

    function contactFilterDirective() {
        return {
            restrict: 'E',
            controller: 'ContactFilterController',
            replace: false,
            template: template,
            scope: {
                model: '=model',
                current: '=current'
            }
        };
    }
    return contactFilterDirective;
});
