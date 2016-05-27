define([
    'angular',
    './graphics-controller',
    './graphics-directive'
], function(
    angular,
    Controller,
    directive
) {
    "use strict";
    return angular.module('ofc.graphics', [])
        .controller('GraphicsController', Controller)
        .directive('ofcGraphics', directive)
        ;
});