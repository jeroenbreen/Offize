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
                line: '=line',
                document: '=document'
            }
        };
    }
    amountDirective.$inject = [];
    return amountDirective;
});
