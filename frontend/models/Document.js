define([
    './_BaseModel',
    './lines/AmountModel',
    './lines/CountModel',
    './lines/EnterModel',
    './lines/SubtotalModel',
    './lines/TextModel',
    'jquery'
], function(
    Parent,
    AmountModel,
    CountModel,
    EnterModel,
    SubtotalModel,
    TextModel,
    $
){
    "use strict";
    function Document(document) {
        this.type = 'document';
        this.id = document && document.id ? Number(document.id) : null;
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

    // import

    _p.importLines = function() {
        for (var i = 0, l = app.store.lines.length; i < l; i++) {
            var line = app.store.lines[i];
            if (line.documentId === this.id) {
                this.lines.push(line);
            }
        }
    };






    _p.exportSettings = function() {
        return {
            ignoreProperties: ['parent', '$$hashKey'],
            children: ['lines']
        }
    };

    _p.setProperties = function(document) {
        this.sender = this.convertSender(document.sender);
        this.client = this.convertClient(document.client);
        this.year = document.year;
        this.nr = document.nr;
        this.date = this.convertDate(document.date);
        this.title = document.title;
        this.paid = document.paid;
        this.rate = document.rate;
        this.currency = document.currency;
        this.locked = document.locked;
        this.vat = document.vat ? document.vat : 21;
        this.english = document.english;
        this.hideTotal = document.hideTotal;
        this.importLines(document.lines);
    };

    _p.convertClient = function(client) {
        return {
            name: client.name ? client.name : client.naam,
            contactPerson: client.contactPerson ? client.contactPerson : client.contact,
            address: client.address ? client.address : client.adres,
            zipcode: client.zipcode ? client.zipcode : client.postcode
        }
    };

    _p.convertSender = function(sender) {
        return {
            name: sender.name ? sender.name : sender.naam,
            contactPerson: sender.contactPerson ? sender.contactPerson : sender.contact,
            address: sender.address ? sender.address : sender.adres,
            zipcode: sender.zipcode ? sender.zipcode : sender.postcode
        }
    };

    _p.convertDate = function(date) {
        return {
            day: date.day ? date.day : date.d,
            month: date.month ? date.month : date.m,
            year: date.year ? date.year : date.j
        }
    };

    _p.addLine = function(type) {
        var lineModel;
        switch (type) {
            case 'amount':
                lineModel = new AmountModel(this);
                break;
            case 'count':
                lineModel = new CountModel(this);
                break;
            case 'enter':
                lineModel = new EnterModel(this);
                break;
            case 'subtotal':
                lineModel = new SubtotalModel(this);
                break;
            case 'text':
                lineModel = new TextModel(this, {text:''});
        }
        this.lines.push(lineModel);
    };




    // object stuff

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