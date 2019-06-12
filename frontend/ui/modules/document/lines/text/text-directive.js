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
                line: '=line',
                document: '=document'
            }
        };
    }
    textDirective.$inject = [];
    return textDirective;
});
