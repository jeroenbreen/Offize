define([
    './../_BaseModel'
],
function(
    Parent
) {
    "use strict";
    function _LineModel() {

    }
    
    var _p = _LineModel.prototype = Object.create(Parent.prototype);

    _p.exportSettings = function() {
        return {
            ignoreProperties: ['parent'],
            children: []
        }
    };

    return _LineModel;
});


