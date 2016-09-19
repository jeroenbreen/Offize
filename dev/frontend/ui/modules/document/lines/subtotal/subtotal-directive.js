define([
    'require/text!./subtotal.tpl'
], function(
    template
) {
    "use strict";
    function subtotalDirective() {
        return {
            restrict: 'E',
            controller: 'SubtotalController',
            replace: false,
            template: template,
            scope: {
                model: '=ofcModel',
                index: '=ofcIndex'
            }
        };
    }
    subtotalDirective.$inject = [];
    return subtotalDirective;
});
