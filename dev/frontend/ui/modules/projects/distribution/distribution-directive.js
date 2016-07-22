define([
    'require/text!./distribution.tpl'
], function(
    template
) {
    "use strict";
    function distributionDirective() {
        return {
            restrict: 'E',
            controller: 'DistributionController',
            replace: false,
            template: template,
            scope: {
                model: '=ofcModel',
                office: '=ofcOffice',
                configuration: '=ofcConfiguration'
            }
        };
    }
    distributionDirective.$inject = [];
    return distributionDirective;
});
