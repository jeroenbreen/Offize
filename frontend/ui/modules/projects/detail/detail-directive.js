define([
    'require/text!./detail.tpl'
], function(
    template
) {
    "use strict";
    function detailDirective() {
        return {
            restrict: 'E',
            controller: 'DetailController',
            replace: false,
            template: template,
            scope: {
                model: '=ofcModel',
                office: '=ofcOffice',
                configuration: '=ofcConfiguration'
            }
        };
    }
    detailDirective.$inject = [];
    return detailDirective;
});
