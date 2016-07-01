define([
    'require/text!./hours.tpl'
], function(
    template
) {
    "use strict";
    function hoursDirective() {
        return {
            restrict: 'E',
            controller: 'HoursController',
            replace: false,
            template: template,
            scope: {
                model: '=ofcModel',
                office: '=ofcOffice',
                configuration: '=ofcConfiguration'
            }
        };
    }
    hoursDirective.$inject = [];
    return hoursDirective;
});
