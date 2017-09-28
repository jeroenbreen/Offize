define([
    'require/text!./clock.tpl'
], function (template) {
    "use strict";

    function clockDirective() {
        return {
            restrict: 'E',
            controller: 'ClockController',
            replace: false,
            template: template,
            scope: {
                clock: '=clock',
                projects: '=projects'
            }
        };
    }

    return clockDirective;
});
