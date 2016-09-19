define([
    'require/text!./text.tpl'
], function(
    template
) {
    "use strict";
    function textDirective() {
        return {
            restrict: 'E',
            controller: 'TextController',
            replace: false,
            template: template,
            scope: {
                model: '=ofcModel'
            }
        };
    }
    textDirective.$inject = [];
    return textDirective;
});
