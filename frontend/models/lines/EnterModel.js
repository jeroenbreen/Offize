define([
    './_LineModel'
], function(
    Parent
){
    "use strict";
    function EnterModel(line, documentId, i) {
        this.type = 'enter';
        this.documentId = documentId;
        this.amount = line && line.amount ? line.amount : 0;
        this.text = line && line.text ? line.text : '';
        this.hours = line && line.hours ? Number(line.hours) : 0;
        this.order = i;
    }

    var _p = EnterModel.prototype = Object.create(Parent.prototype);

    return EnterModel;
});
