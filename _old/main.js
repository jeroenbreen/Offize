require([
    'require/domReady',
    'angular',
    'ui/app',
    'office',
    'models/App'
], function (
    domReady,
    angular,
    angularApp,
    Office,
    office
) {
    "use strict";

    var model = new office();
    window.app = model;

    angularApp.constant('office', model);

    window.office = new Office(model, angularApp);
    domReady(function() {
        angular.bootstrap(document, [angularApp.name]);
    });
});
