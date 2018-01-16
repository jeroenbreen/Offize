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
    OfficeModel
) {
    "use strict";

    var model = new OfficeModel();
    window.app = model;

    window.office = new Office(model, angularApp);
    domReady(function() {
        angular.bootstrap(document, [angularApp.name]);
    });
});
