define([
    'require/text!./block-detail.tpl'
], function (template) {
    "use strict";

    function blockDetailDirective() {
        return {
            restrict: 'E',
            controller: 'BlockDetailController',
            replace: false,
            template: template,
            scope: {
                block: '=block',
                projects: '=projects',
                jobs: '=jobs'
            }
        };
    }

    return blockDetailDirective;
});
