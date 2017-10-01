define([
    'require/text!./day.tpl'
], function (template) {
    "use strict";

    function dayDirective() {
        return {
            restrict: 'E',
            controller: 'DayController',
            replace: false,
            template: template,
            scope: {
                day: '=day',
                blocks: '=blocks',
                projects: '=projects'
            }
        };
    }

    return dayDirective;
});
