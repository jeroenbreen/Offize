define([
    './_LineModel'
], function(
    Parent
){
    "use strict";
    function TextModel(parent, line) {
        Object.defineProperty(this, 'parent', { value: parent, enumerable: false, writable: true, configurable: true });
        this.type = 'text';
        this.import(line);
    }

    var _p = TextModel.prototype = Object.create(Parent.prototype);

    _p.import = function(line) {
        if (!line.hasOwnProperty('text')) {
            if (line.type === 'text') {
                this.text = line.content
            } else {
                this.text = line.titel;
            }
        } else {
            this.text = line.text;
        }
    };

    return TextModel;
});
