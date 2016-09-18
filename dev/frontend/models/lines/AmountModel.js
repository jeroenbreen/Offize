define([
    './_LineModel'
], function(
    Parent
){
    "use strict";
    function AmountModel(parent, line) {
        Object.defineProperty(this, 'parent', { value: parent, enumerable: false, writable: true, configurable: true });
        this.type = 'amount';
        this.title = '';
        this.amount = 0;
        if (line) {
            this.import(line);
        }
    }

    var _p = AmountModel.prototype = Object.create(Parent.prototype);

    _p.import = function(line) {
        if (!line.title) {
            this.title = line.titel;
            this.amount = line.bedrag;
        } else {
            this.title = line.title;
            this.amount = line.amount;
        }
    };

    return AmountModel;
});
