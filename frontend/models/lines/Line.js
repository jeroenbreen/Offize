define([
    './../_BaseModel'
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
        this.job = line && line.jobId ? app.getJobById(line.jobId) : null;
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

    _p.toCSV = function() {
        var string = '';
        string += ',';
        string += this.documentId + ',';
        string += this.type + ',';
        string += this.text.replace(/,/g,' -') + ',';
        string += this.hours + ',';
        string += this.amount + ',';
        string += this.arrayOrder + ',';
        string += this.rate + '\n';
        return string;
    };

    _p.toBackend = function() {
        var line = {};
        for (var key in this) {
            if (this.hasOwnProperty(key)) {
                switch (key) {
                    case 'job':
                        if (this.job) {
                            line.jobId = this.job.id;
                        } else {
                            line.jobId = 0;
                        }

                        break;
                    default:
                        line[key] = this[key];
                        break;
                }
            }
        }
        return line;
    };

    return LineModel;
});
