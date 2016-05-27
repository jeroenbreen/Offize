define([
    'require/text!./graphics.tpl'
], function(
    template
) {
    "use strict";
    function graphicsDirective() {
        return {
            restrict: 'E',
            controller: 'GraphicsController',
            replace: false,
            template: template,
            scope: {
                model: '=ofcModel'
            }
        };
    }
    graphicsDirective.$inject = [];
    return graphicsDirective;
});
