define([],
function() {
    "use strict";
    function _BaseModel() {
        
    }
    var _p = _BaseModel.prototype;

    // _p.export = function() {
    //     var exportObject = {},
    //         settings = this.exportSettings();
    //     settings.ignoreProperties.push('$$hashKey');
    //     for (var property in this) {
    //         if (this.hasOwnProperty(property) && typeof this[property] != 'function') {
    //             if (settings.children.indexOf(property) > -1) {
    //                 exportObject[property] = this.exportChildren(property);
    //             } else if (settings.ignoreProperties.indexOf(property) === -1) {
    //                 exportObject[property] = this[property];
    //             }
    //         }
    //
    //     }
    //     return exportObject;
    // };
    //
    // _p.exportChildren = function(property) {
    //     var children = [];
    //     for (var i = 0, l = this[property].length; i < l; i++ ) {
    //         var child = this[property][i];
    //         children.push(child.export());
    //     }
    //     if (this.type === 'projects') {
    //         return JSON.stringify(children);
    //     } else {
    //         return children;
    //     }
    // };

    _p.toBackend = function() {
        var contact = {};
        for (var key in this) {
            if (this.hasOwnProperty(key)) {
                contact[key] = this[key];
            }
        }

        return contact;
    };

    _p.toSlug = function(limitString) {
        function digitize(x) {
            if (x < 100) {
                if (x < 10) {
                    return '00' + x;
                } else {
                    return '0' + x;
                }
            } else {
                return x;
            }
        }

        var name = this.type === 'contact' ? this.name : this.projectName,
            nr = this.type === 'contact' ? this.contactId : this.projectId,
            formattedName = name.toLowerCase().replace(/\//g, '-').replace(/\s/g, '-').replace(/\./g, '-').replace(/-+/g, '-'),
            label = digitize(nr) + '-' + formattedName;

        if (limitString && label.length > limitString) {
            return label.substr(0,limitString) + '...'
        } else {
            return label;
        }
    };
    
    return _BaseModel;
});