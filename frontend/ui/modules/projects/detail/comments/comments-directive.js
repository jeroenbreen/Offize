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
                project: '=project',
                office: '=ofcOffice'
            }
        };
    }
    commentsDirective.$inject = [];
    return commentsDirective;
});
