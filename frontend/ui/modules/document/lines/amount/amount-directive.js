define([
    'require/text!./amount.tpl'
], function(
    template
) {
    "use strict";
    function amountDirective() {
        return {
            restrict: 'E',
            controller: 'AmountController',
            replace: false,
            template: template,
            scope: {
                model: '=ofcModel',
                document: '=ofcDocument'
            }
        };
    }
    amountDirective.$inject = [];
    return amountDirective;
});
