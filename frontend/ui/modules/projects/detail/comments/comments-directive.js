define([
    'require/text!./comments.tpl'
], function(
    template
) {
    "use strict";
    function commentsDirective() {
        return {
            restrict: 'E',
            controller: 'CommentsController',
            replace: false,
            template: template,
            scope: {
                model: '=ofcModel',
                office: '=ofcOffice'
            }
        };
    }
    commentsDirective.$inject = [];
    return commentsDirective;
});
