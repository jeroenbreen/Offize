define([
    'require/text!./app.tpl'
], function(
    template
) {
    "use strict";
    function appDirective() {
        return {
            restrict: 'E',
            controller: 'AppController',
            replace: false,
            template: template,
            scope: {
                model: '=ofcModel'
            }
        };
    }
    appDirective.$inject = [];
    return appDirective;
});
