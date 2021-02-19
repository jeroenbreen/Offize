import commonTools from '@/tools/common-tools';

class Document {
    constructor(document) {
        this.type = 'document';
        this.id = document ? Number(document.id) : null;
        this.doctype = document ?  document.doctype : null;
        this.projectId = document ? Number(document.projectId) : null;
        this.employeeId = document ? Number(document.employeeId) : null;
        this.title = document ? document.title : '';
        this.nr = document ? Number(document.nr) : null;
        this.clientName = document ? document.clientName : '';
        this.year = document ? Number(document.year) : new Date().getFullYear();
        this.month = document ? Number(document.month) : (new Date().getMonth() + 1);
        this.day = document ? Number(document.day) : new Date().getDate();

        this.vat = document ? Number(document.vat) : 21;
        this.currency = document ? document.currency : 'EUR';
        this.paid = document ? Boolean(parseInt(document.paid)) : false;
        this.locked = document ? Boolean(parseInt(document.locked)) : false;
        this.english = document ? Boolean(parseInt(document.english)) : false;
        this.hideTotal = document ? Boolean(parseInt(document.hideTotal)) : false;
        this.rate = document ? Number(document.rate) : 0;
        //this.mails = document ? document.mails ? JSON.parse(document.mails) : [];
    }

    toSlug() {
        return this.year + '-' + commonTools.digitize(this.nr);
    };

    getPrefix() {
        if (this.english) {
            return this.doctype === 'invoice' ? 'Invoice' : 'Quotation';
        } else {
            return this.doctype === 'invoice' ? 'Factuur' : 'Offerte';
        }

    };

    getPDFname() {
        return this.getPrefix() + '-' + this.toSlug() + '.pdf';
    };

    //

    daysLate(date, maxDays) {
        let today, invoiceDate, difference, msPerDay;
        today = date;
        invoiceDate = new Date(this.year + '-' + this.month + '-' + this.day).getTime();
        difference = today - invoiceDate;
        msPerDay = 1000 * 60 * 60 * 24;
        return Math.round((difference / (msPerDay)) - maxDays);
    }

    late(date, maxDays) {
        return !this.paid && this.daysLate(date, maxDays) > 0;
    }



    // object stuff

    toPrint(){
        var document = {};
        document.doctype = this.doctype;
        document.title = this.title;
        document.prefix = this.getPrefix();
        document.slug = this.toSlug();
        document.year = this.year;
        document.month = this.month;
        document.day = this.day;
        document.vat = this.vat;
        document.currency = this.currency;
        document.hideTotal = this.hideTotal;
        document.lines = [];
        return document;
    };

    toBackend() {
        var document = {};
        for (var key in this) {
            if (this.hasOwnProperty(key)) {
                switch (key) {
                    case 'paid':
                    case 'locked':
                    case 'english':
                    case 'hideTotal':
                        document[key] = this[key] ? 1 : 0;
                        break;
                    default:
                        document[key] = this[key];
                        break;
                }
            }
        }
        return document;
    };

    toCSV() {
        var string = '';

        function boolToInt(bool) {
            return bool ? 1 : 0;
        }

        string += this.id + ',';
        string += this.contact.id + ',';
        string += this.contactName + ',';
        string += this.projectId + ',';
        string += this.doctype + ',';
        string += this.currency + ',';
        string += boolToInt(this.english) + ',';
        string += boolToInt(this.hideTotal) + ',';
        string += boolToInt(this.locked) + ',';
        string += this.nr + ',';
        string += boolToInt(this.paid) + ',';
        string += this.member.memberId + ',';
        string += this.title + ',';
        string += this.vat + ',';
        string += this.year + ',';
        string += this.month + ',';
        string += this.day + ',';
        string += this.rate;
        return string + '\n';
    };

    linesToCSV() {
        var string = '';
        for (var i = 0, l = this.lines.length; i < l; i++) {
            var line = this.lines[i];
            string += line.toCSV();
        }
        return string;
    };
}

export default Document;