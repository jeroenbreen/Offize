import _Base from './_Base';

class DocumentLine extends _Base {

    constructor (line) {
        super(line);
        this.type = 'line';
        this.lineType = line && line.lineType ? line.lineType: '';
        this.documentId = line && line.documentId ? Number(line.documentId) : null;
        this.amount = line && line.amount ? Number(line.amount) : 0;
        this.text = line && line.text ? line.text : '';
        this.hours = line && line.hours ? Number(line.hours) : 0;
        this.arrayOrder = line && line.arrayOrder ? Number(line.arrayOrder) : 0;
        this.rate = line && line.rate ? Number(line.rate) : 0;
    }

    getAmount(){
        switch (this.lineType) {
            case 'amount':
                return this.amount;
            case 'count':
                return this.hours * this.rate;
        }
    }

    toCSV(){
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
    }

    toBackend(){
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
    }

    toPrint(){
        return {
            id: this.id,
            type: this.type,
            lineType: this.lineType,
            amount: this.amount,
            text: this.text,
            hours: this.hours,
            rate: this.rate
        }
    }
}

export default DocumentLine;