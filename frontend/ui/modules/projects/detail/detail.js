define([
    'angular',
    './detail-controller',
    './detail-directive',
    './comments/comments'
], function(
    angular,
    Controller,
    directive,
    commentsModule
) {
    "use strict";
    return angular.module('ofc.detail', [
        commentsModule.name
    ])
        .controller('DetailController', Controller)
        .directive('ofcDetail', directive)
        ;
});
