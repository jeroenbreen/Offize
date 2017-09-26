define([],
function() {
    "use strict";
    function _BaseModel() {
        
    }
    var _p = _BaseModel.prototype;

    _p.toBackend = function() {
        var contact = {};
        for (var key in this) {
            if (this.hasOwnProperty(key)) {
                contact[key] = this[key];
            }
        }

        return contact;
    };
    
    return _BaseModel;
});