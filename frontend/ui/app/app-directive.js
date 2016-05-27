define([
    'require/text!./app.tpl'
], function(
    template
) {
    "use strict";
    function appDirective($document) {
        return {
            restrict : 'E',
            controller : 'AppController',
            replace : false,
            template : template
        };
    }


    appDirective.$inject = ['$document'];
    return appDirective;
});
