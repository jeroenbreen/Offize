define([],
function() {
    "use strict";
    function _BaseModel() {
        
    }
    var _p = _BaseModel.prototype;

    _p.export = function() {
        var exportObject = {},
            settings = this.exportSettings();
        settings.ignoreProperties.push('$$hashKey');
        for (var property in this) {
            if (this.hasOwnProperty(property) && typeof this[property] != 'function') {
                if (settings.children.indexOf(property) > -1) {
                    exportObject[property] = this.exportChildren(property);
                } else if (settings.ignoreProperties.indexOf(property) === -1) {
                    exportObject[property] = this[property];
                }
            }

        }
        return exportObject;
    };

    _p.exportChildren = function(property) {
        var children = [];
        for (var i = 0, l = this[property].length; i < l; i++ ) {
            var child = this[property][i];
            children.push(child.export());
        }
        if (this.type === 'projects') {
            return JSON.stringify(children);
        } else {
            return children;
        }

    };
    
    return _BaseModel;
});