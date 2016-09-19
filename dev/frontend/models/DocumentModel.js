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
    function DocumentModel(parent, document, doctype) {
        Object.defineProperty(this, 'parent', { value: parent, enumerable: false, writable: true, configurable: true });
        this.doctype = doctype;
        this.sender = {};
        this.client = {};
        this.year = 0;
        this.nr = 0;
        this.date = {};
        this.title = '';
        this.paid = false;
        this.rate = 0;
        this.currency = '';
        this.lines = [];
        this.locked = false;
        this.vat = true;
        this.english = false;
        this.newStyle = false;
        this.setProperties(document);
    }

    var _p = DocumentModel.prototype = Object.create(Parent.prototype);

    _p.exportSettings = function() {
        return {
            ignoreProperties: ['parent', '$$hashKey'],
            children: ['lines']
        }
    };

    _p.setProperties = function(document) {
        if (!document.sender) {
            this.sender = document.bedrijf;
            this.client = document.klant;
            this.year = document.jaar;
            this.nr = document.nr;
            this.date = document.datum;
            this.title = document.omschrijving;
            this.paid = document.betaald;
            this.rate = document.rate;
            this.currency = document.currency;
            this.locked = document.locked;
            this.vat = document.btw;
            this.english = document.english;
            this.newStyle = true;
            this.importLines(document.posten);
        } else {
            this.sender = document.sender;
            this.client = document.client;
            this.year = document.year;
            this.nr = document.nr;
            this.date = document.date;
            this.title = document.title;
            this.paid = document.paid;
            this.rate = document.rate;
            this.currency = document.currency;
            this.locked = document.locked;
            this.vat = document.vat;
            this.english = document.english;
            this.newStyle = true;
            this.importLines(document.lines);
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

    _p.importLines = function(lines) {
        for (var i = 0, l = lines.length; i < l; i++) {
            var line = lines[i],
                lineModel;
            switch (line.type) {
                case 'amount':
                case 'bedrag':
                    lineModel = new AmountModel(this, line);
                    break;
                case 'count':
                case 'uren':
                    lineModel = new CountModel(this, line);
                    break;
                case 'enter':
                    lineModel = new EnterModel(this, line);
                    break;
                case 'subtotal':
                    lineModel = new SubtotalModel(this, line);
                    break;
                case 'kopje':
                case 'text':
                    lineModel = new TextModel(this, line);
                    break;
            }
            this.lines.push(lineModel);
        }
    };

    _p.getPrefix = function() {
        switch (this.doctype) {
            case 'Tenders':
                return 'Offerte';
                break;
            case 'Invoices':
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

    return DocumentModel;
});
