define([
    'require/text!./line.tpl'
], function (template) {
    "use strict";

    function lineDirective() {
        return {
            restrict: 'E',
            controller: 'LineController',
            replace: false,
            template: template,
            scope: {
                line: '=line',
                document: '=ofcDocument'
            }
        };
    }

    return lineDirective;
});
