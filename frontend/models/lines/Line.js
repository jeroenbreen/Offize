define([
    './_LineModel'
], function(
    Parent
){
    "use strict";
    function LineModel(line) {
        this.id = line && line.id ? Number(line.id) : null;
        this.type = 'line';
        this.lineType = line && line.lineType ? line.lineType: '';
        this.documentId = line && line.documentId ? Number(line.documentId) : null;
        this.amount = line && line.amount ? Number(line.amount) : 0;
        this.text = line && line.text ? line.text : '';
        this.hours = line && line.hours ? Number(line.hours) : 0;
        this.arrayOrder = line && line.arrayOrder ? Number(line.arrayOrder) : 0;
        this.rate = line && line.rate ? Number(line.rate) : 0;
    }

    var _p = LineModel.prototype = Object.create(Parent.prototype);

    _p.getAmount = function() {
        switch (this.lineType) {
            case 'amount':
                return this.amount;
                break;
            case 'count':
                return this.hours * this.rate;
                break;
        }
    };

    return LineModel;
});
