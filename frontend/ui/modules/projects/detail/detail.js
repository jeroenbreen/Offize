define([
    'angular',
    './detail-controller',
    './detail-directive',
    './comments/comments',
    './report/report'
], function(
    angular,
    Controller,
    directive,
    commentsModule,
    reportModule
) {
    "use strict";
    return angular.module('ofc.detail', [
        commentsModule.name,
        reportModule.name
    ])
        .controller('DetailController', Controller)
        .directive('ofcDetail', directive)
        ;
});
