define([
    'require/text!./settings.tpl'
], function (
    template
) {
    "use strict";

    function settingsDirective() {
        return {
            restrict: 'E',
            controller: 'SettingsController',
            replace: false,
            template: template,
            scope: {}
        };
    }

    return settingsDirective;
});
