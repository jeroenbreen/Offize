define([
    'angular',
    './settings-controller',
    './settings-directive'
], function (
    angular,
    Controller,
    directive
) {
    "use strict";
    return angular.module('settings', [])
        .controller('SettingsController', Controller)
        .directive('settings', directive)
});
