define([
    'require/text!./document.tpl'
], function(
    template
) {
    "use strict";
    function documentDirective() {
        return {
            restrict: 'E',
            controller: 'DocumentController',
            replace: false,
            template: template,
            scope: {
                model: '=ofcModel',
                office: '=ofcOffice'
            }
        };
    }
    documentDirective.$inject = [];
    return documentDirective;
});
