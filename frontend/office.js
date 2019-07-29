define([], function() {
    "use strict";
    function Office(model, angularApp) {
        this.angularApp = angularApp;
        this.model = model;
    }

    var _p = Office.prototype;

    return Office;
});
