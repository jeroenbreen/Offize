define([
    './_BaseModel',
    'ui/ui-tools/common-tools',
    'jquery'
], function(
    Parent,
    commonTools,
    $
){
    "use strict";
    function Document(document) {
        this.type = 'document';
        this.id = document ? Number(document.id) : null;
        this.projectId = Number(document.projectId);
        this.doctype = document.doctype;
        this.member = app.getMemberById(Number(document.memberId));

        this.title = document.title;
        this.nr = Number(document.nr);
        this.contactName = document.contactName;
        this.contact = document ? app.getContactById(Number(document.contactId)) : null;
        this.year = Number(document.year);
        this.month = Number(document.month);
        this.day = Number(document.day);

        this.vat = Number(document.vat);
        this.currency = document.currency;
        this.paid = Boolean(parseInt(document.paid));
        this.locked = Boolean(parseInt(document.locked));
        this.english = Boolean(parseInt(document.english));
        this.hideTotal = Boolean(parseInt(document.hideTotal));
        this.rate = Number(document.rate);

        this.lines = [];
        // skip this for new created documents
        if (document.id !== null) {
            this.importLines();
        }
    }

    var _p = Document.prototype = Object.create(Parent.prototype);

    _p.importLines = function() {
        for (var i = 0, l = app.store.lines.length; i < l; i++) {
            var line = app.store.lines[i];
            if (line.documentId === this.id) {
                this.lines.push(line);
            }
        }
    };

    _p.toSlug = function() {
        return this.year + '-' + commonTools.digitize(this.nr);
    };

    _p.getPrefix = function() {
        return this.doctype === 'invoice' ? 'Factuur' : 'Offerte';
    };



    // object stuff

    _p.toPrint = function(){
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
        document.lines = this.lines;
        return document;
    };

    _p.toBackend = function() {
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
                    case 'lines':
                    case '$$hashKey':
                        // skip
                        break;
                    case 'member':
                        document.memberId = this.member.memberId;
                        break;
                    case 'contact':
                        document.contactId = this.contact.contactId;
                        break;
                    default:
                        document[key] = this[key];
                        break;
                }
            }
        }
        return document;
    };

    _p.toCSV = function() {
        var string = '';

        function boolToInt(bool) {
            return bool ? 1 : 0;
        }

        string += this.id + ',';
        string += this.contact.contactId + ',';
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

    _p.linesToCSV = function() {
        var string = '';
        for (var i = 0, l = this.lines.length; i < l; i++) {
            var line = this.lines[i];
            string += line.toCSV();
        }
        return string;
    };

    return Document;
});