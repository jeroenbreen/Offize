define([
    './_LineModel'
], function(
    Parent
){
    "use strict";
    function SubtotalModel(line, documentId, i) {
        this.type = 'subtotal';
        this.documentId = documentId;
        this.amount = line && line.amount ? line.amount : 0;
        this.text = line && line.text ? line.text : '';
        this.hours = line && line.hours ? Number(line.hours) : 0;
        this.order = i;
    }

    var _p = SubtotalModel.prototype = Object.create(Parent.prototype);

    return SubtotalModel;
});
