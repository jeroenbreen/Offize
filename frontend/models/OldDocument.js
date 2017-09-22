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
    function OldDocumentModel(parent, document, type) {
        this.parent = parent;
        this.id = app.findDocumentId(document);
        this.lines = [];
        this.importLines(document);
    }

    var _p = OldDocumentModel.prototype = Object.create(Parent.prototype);

    _p.importLines = function(document) {
        if (document.lines && document.lines.length > 0) {
            for (var i = 0, l = document.lines.length; i < l; i++) {
                var line = document.lines[i];
                this.addLine(line, i)
            }
        }
        app.documents.push(this);
    };

    _p.addLine = function(line, i) {
        var lineModel;
        switch (line.type) {
            case 'amount':
                lineModel = new AmountModel(line, this.id, i);
                break;
            case 'count':
                lineModel = new CountModel(line, this.id, i);
                break;
            case 'enter':
                lineModel = new EnterModel(line, this.id, i);
                break;
            case 'subtotal':
                lineModel = new SubtotalModel(line, this.id, i);
                break;
            case 'text':
                lineModel = new TextModel(line, this.id, i);
        }
        this.lines.push(lineModel);
    };

    _p.linesToCSV = function() {
        var string = '';
        for (var i = 0, l = this.lines.length; i < l; i++) {
            var line = this.lines[i];
            string += line.toCSV();
        }
        return string;
    };

    return OldDocumentModel;
});
