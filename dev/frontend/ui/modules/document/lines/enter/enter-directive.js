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
                model: '=ofcModel'
            }
        };
    }
    enterDirective.$inject = [];
    return enterDirective;
});
