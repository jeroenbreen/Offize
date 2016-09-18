define([
    './_LineModel'
], function(
    Parent
){
    "use strict";
    function SubtotalModel(parent, line) {
        Object.defineProperty(this, 'parent', { value: parent, enumerable: false, writable: true, configurable: true });
        this.type = 'subtotal';
    }

    var _p = SubtotalModel.prototype = Object.create(Parent.prototype);



    return SubtotalModel;
});
