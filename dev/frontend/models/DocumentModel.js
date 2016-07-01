define([
    './_BaseModel',
    'angular',
    'jquery'
], function(
    Parent,
    angular,
    $
){
    "use strict";
    function DocumentModel(parent, document, doctype) {
        Object.defineProperty(this, 'parent', { value: parent, enumerable: false, writable: true, configurable: true });
        this.doctype = doctype;
        this.setProperties(document);
    }

    var _p = DocumentModel.prototype = Object.create(Parent.prototype);

    _p.setProperties = function(document) {
        for (var property in document) {
            this[property] = angular.copy(document[property]);
        }
    };

    _p.remove = function() {
        var project = this.parent,
            office = this.parent.parent;
        project[this.doctype].splice(project[this.doctype].indexOf(this), 1);
        office[[this.doctype]].splice(office[this.doctype].indexOf(this), 1);
    };

    _p.getClean = function() {
        var parameterised = {},
            ignoreProperties = [],
            self = this;
        ignoreProperties.push('parent');
        ignoreProperties.push('$$hashKey');
        for (var property in self) {
            if ($.type(self[property]) !== 'function' && ignoreProperties.indexOf(property) === -1) {
                parameterised[property] = self[property];
            }
        }
        return parameterised;
    };

    return DocumentModel;
});
