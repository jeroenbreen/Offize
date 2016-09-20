define([
    'require/text!./contacts.tpl'
], function(
    template
) {
    "use strict";
    function contactsDirective() {
        return {
            restrict: 'E',
            controller: 'ContactsController',
            replace: false,
            template: template,
            scope: {
                model: '=ofcModel'
            }
        };
    }
    contactsDirective.$inject = [];
    return contactsDirective;
});