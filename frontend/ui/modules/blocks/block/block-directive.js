define([
    'require/text!./block.tpl'
], function (template) {
    "use strict";

    function blockDirective() {
        return {
            restrict: 'E',
            controller: 'BlockController',
            replace: false,
            template: template,
            scope: {
                block: '=block'
            }
        };
    }

    return blockDirective;
});
