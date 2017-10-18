define([
    'require/text!./todo.tpl'
], function (template) {
    "use strict";

    function todoDirective() {
        return {
            restrict: 'E',
            controller: 'TodoController',
            replace: false,
            template: template,
            scope: {
                todo: '=todo',
                date: '=date'
            }
        };
    }

    return todoDirective;
});
