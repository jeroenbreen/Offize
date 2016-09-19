define([
    './_LineModel'
], function(
    Parent
){
    "use strict";
    function TextModel(parent, line) {
        Object.defineProperty(this, 'parent', { value: parent, enumerable: false, writable: true, configurable: true });
        this.type = 'text';
        this.text = line.text;
    }

    var _p = TextModel.prototype = Object.create(Parent.prototype);

    return TextModel;
});
