define([
    './_LineModel'
], function(
    Parent
){
    "use strict";
    function EnterModel(parent, line) {
        Object.defineProperty(this, 'parent', { value: parent, enumerable: false, writable: true, configurable: true });
        this.type = 'enter';
    }

    var _p = EnterModel.prototype = Object.create(Parent.prototype);



    return EnterModel;
});
