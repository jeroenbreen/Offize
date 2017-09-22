define([
    './_LineModel'
], function(
    Parent
){
    "use strict";
    function CountModel(line, documentId, i) {
        this.type = 'count';
        this.documentId = documentId;
        this.amount = line && line.amount ? line.amount : 0;
        this.text = line && line.title ? line.title : '';
        this.hours = line && line.hours ? Number(line.hours) : 0;
        this.order = i;
    }

    var _p = CountModel.prototype = Object.create(Parent.prototype);

    return CountModel;
});
