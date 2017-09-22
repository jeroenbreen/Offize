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
        this.id = Number(document.id);
        this.projectId = Number(document.projectId);
        this.type = document.type;
        this.member = app.getMemberById(Number(document.memberId));

        this.title = document.title;
        this.nr = Number(document.nr);
        this.clientName = document.clientName;
        this.year = Number(document.year);
        this.month = Number(document.month);
        this.day = Number(document.day);

        this.vat = Number(document.vat);
        this.currency = document.currency;
        this.paid = Boolean(parseInt(document.paid));
        this.locked = Boolean(parseInt(document.locked));
        this.english = Boolean(parseInt(document.english));
        this.hideTotal = Boolean(parseInt(document.hideTotal));

        this.lines = [];
        this.importLines();
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
    //
    // _p.importLines = function(lines) {
    //     for (var i = 0, l = lines.length; i < l; i++) {
    //         var line = lines[i],
    //             lineModel;
    //         switch (line.type) {
    //             case 'amount':
    //             case 'bedrag':
    //                 lineModel = new AmountModel(this, line);
    //                 break;
    //             case 'count':
    //             case 'uren':
    //                 lineModel = new CountModel(this, line);
    //                 break;
    //             case 'enter':
    //                 lineModel = new EnterModel(this, line);
    //                 break;
    //             case 'subtotal':
    //                 lineModel = new SubtotalModel(this, line);
    //                 break;
    //             case 'kopje':
    //             case 'text':
    //                 lineModel = new TextModel(this, line);
    //                 break;
    //         }
    //         this.lines.push(lineModel);
    //     }
    // };

    _p.getPrefix = function() {
        switch (this.doctype) {
            case 'tenders':
                return 'Offerte';
                break;
            case 'invoices':
                return 'Factuur';
                break;
        }
    };

    _p.remove = function() {
        var project = this.parent,
            office = this.parent.parent;
        project[this.doctype].splice(project[this.doctype].indexOf(this), 1);
        office[[this.doctype]].splice(office[this.doctype].indexOf(this), 1);
    };

    _p.getClean = function() {
        var parameterised = {},
            ignoreProperties = [],
            self = this;
        ignoreProperties.push('parent');
        ignoreProperties.push('$$hashKey');
        for (var property in self) {
            if ($.type(self[property]) !== 'function' && ignoreProperties.indexOf(property) === -1) {
                parameterised[property] = self[property];
            }
        }
        return parameterised;
    };

    _p.toCSV = function() {
        var string = '';

        function boolToInt(bool) {
            return bool ? 1 : 0;
        }

        string += this.id + ',';
        string += this.clientName + ',';
        string += this.projectId + ',';
        string += this.type + ',';
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
        console.log(string);

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