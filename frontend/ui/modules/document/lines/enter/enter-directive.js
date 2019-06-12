define([
    'require/text!./enter.tpl'
], function(
    template
) {
    "use strict";
    function enterDirective() {
        return {
            restrict: 'E',
            controller: 'EnterController',
            replace: false,
            template: template,
            scope: {
                line: '=line',
                document: '=document'
            }
        };
    }
    enterDirective.$inject = [];
    return enterDirective;
});
