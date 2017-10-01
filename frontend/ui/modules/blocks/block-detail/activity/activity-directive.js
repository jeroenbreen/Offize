define([
    'require/text!./activity.tpl'
], function (template) {
    "use strict";

    function activityDirective() {
        return {
            restrict: 'E',
            controller: 'ActivityController',
            replace: false,
            template: template,
            scope: {
                activity: '=activity',
                project: '=project',
                jobs: '=jobs'
            }
        };
    }

    return activityDirective;
});
