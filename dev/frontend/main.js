require([
    'require/domReady',
    'angular',
    'ui/app/app',
    'office',
    'models/OfficeModel'
], function (
    domReady,
    angular,
    angularApp,
    Office,
    OfficeModel
) {
    "use strict";

    var model = new OfficeModel();

    window.office = new Office(model, angularApp);
    domReady(function() {
        angular.bootstrap(document, [angularApp.name]);
    });
});
