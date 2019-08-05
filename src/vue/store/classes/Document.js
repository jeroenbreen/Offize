import commonTools from '@tools/common-tools';

class Document {
    constructor(document) {
        this.type = 'document';
        this.id = document ? Number(document.id) : null;
        this.doctype = document ?  document.doctype : null;
        this.projectId = document ? Number(document.projectId) : null;
        this.employeeId = document ? Number(document.employeeId) : null;
        this.title = document ? document.title : '';
        this.nr = document ? Number(document.nr) : null;
        this.contactName = document ? document.contactName : '';
        this.year = document ? Number(document.year) : new Date().getFullYear();
        this.month = document ? Number(document.month) : (new Date().getMonth() + 1);
        this.day = document ? Number(document.day) : new Date().getDate();

        this.vat = document ? Number(document.vat) : 21;
        this.currency = document ? document.currency : 'EUR';
        this.paid = document ? Boolean(parseInt(document.paid)) : false;
        this.locked = document ? Boolean(parseInt(document.locked)) : false;
        this.english = document ? Boolean(parseInt(document.english)) : false;
        this.hideTotal = document ? Boolean(parseInt(document.hideTotal)) : false;
        this.rate = document ? Number(document.rate) : 100;
        //this.mails = document ? document.mails ? JSON.parse(document.mails) : [];
    }

    toSlug() {
        return this.year + '-' + commonTools.digitize(this.nr);
    };

    getPrefix() {
        return this.doctype === 'invoice' ? 'Factuur' : 'Offerte';
    };

    getPDFname() {
        return this.getPrefix() + '-' + this.toSlug() + '.pdf';
    };



    // object stuff

    toPrint(){
        var document = {};
        document.doctype = this.doctype;
        document.company = app.company;
        document.member = this.member.name;
        document.title = this.title;
        document.prefix = this.getPrefix();
        document.slug = this.toSlug();
        document.contact = {
            name: this.contact.name,
            contactName: this.contactName,
            address: this.contact.street,
            zipcode: this.contact.zipcode,
            city: this.contact.city
        };
        document.year = this.year;
        document.month = this.month;
        document.day = this.day;
        document.vat = this.vat;
        document.currency = this.currency;
        document.hideTotal = this.hideTotal;
        document.lines = [];
        for (var i = 0, l = this.lines.length; i < l; i++) {
            var line = this.lines[i];
            document.lines.push(line.toPrint())
        }
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