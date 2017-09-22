define([
    './_LineModel'
], function(
    Parent
){
    "use strict";
    function LineModel(line) {
        this.type = line && line.type ? line.type: '';
        this.documentId = line && line.documentId ? Number(line.documentId) : null;
        this.amount = line && line.amount ? line.amount : 0;
        this.text = line && line.text ? line.text : '';
        this.hours = line && line.hours ? Number(line.hours) : 0;
        this.arrayOrder = line && line.arrayOrder ? Number(line.arrayOrder) : 0;
        this.rate = line && line.rate ? Number(line.rate) : 0;
    }

    var _p = LineModel.prototype = Object.create(Parent.prototype);

    return LineModel;
});
