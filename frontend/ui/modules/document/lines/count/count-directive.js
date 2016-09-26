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
                model: '=ofcModel'
            }
        };
    }
    countDirective.$inject = [];
    return countDirective;
});
