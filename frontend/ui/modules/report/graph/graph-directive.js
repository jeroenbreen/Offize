define([
    'require/text!./graph.tpl'
], function (template) {
    "use strict";

    function graphDirective() {
        return {
            restrict: 'E',
            controller: 'GraphController',
            replace: false,
            template: template,
            scope: {
                a: '=a',
                b: '=b'
            }
        };
    }

    return graphDirective;
});
