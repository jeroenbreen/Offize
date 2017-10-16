define([
    'angular',
    './todo-controller',
    './todo-directive'
], function (
    angular,
    Controller,
    directive
) {
    "use strict";
    return angular.module('todo', [])
        .controller('TodoController', Controller)
        .directive('todo', directive)
});
