define([
    'angular',
    './comments-controller',
    './comments-directive'
], function(
    angular,
    Controller,
    directive
) {
    "use strict";
    return angular.module('ofc.comments', [])
           .controller('CommentsController', Controller)
           .directive('ofcComments', directive)
           ;
});
