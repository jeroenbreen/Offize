define([
    './_LineModel'
], function(
    Parent
){
    "use strict";
    function AmountModel(line, documentId, i) {
        this.type = 'amount';
        this.documentId = documentId;
        this.amount = line && line.amount ? Number(line.amount) : 0;
        this.text = line && line.title ? line.title : '';
        this.hours = line && line.hours ? Number(line.hours) : 0;
        this.order = i;
    }

    var _p = AmountModel.prototype = Object.create(Parent.prototype);

    return AmountModel;
});
