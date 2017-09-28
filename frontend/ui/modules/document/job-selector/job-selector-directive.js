define([
    'require/text!./job-selector.tpl'
], function (template) {
    "use strict";

    function jobSelectorDirective() {
        return {
            restrict: 'E',
            controller: 'JobSelectorController',
            replace: false,
            template: template,
            scope: {
                line: '=line',
                jobCategories: '=jobCategories'
            }
        };
    }

    return jobSelectorDirective;
});
