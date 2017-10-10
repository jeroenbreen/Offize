define([
    'require/text!./report.tpl'
], function (template) {
    "use strict";

    function reportDirective() {
        return {
            restrict: 'E',
            controller: 'ReportController',
            replace: false,
            template: template,
            scope: {
                projects: '=projects',
                report: '=report',
                app: '=app'
            }
        };
    }

    return reportDirective;
});
