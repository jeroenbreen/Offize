define([
    'require/text!./count.tpl'
], function(
    template
) {
    "use strict";
    function countDirective() {
        return {
            restrict: 'E',
            controller: 'CountController',
            replace: false,
            template: template,
            scope: {
                line: '=line',
                document: '=document'
            }
        };
    }
    countDirective.$inject = [];
    return countDirective;
});
