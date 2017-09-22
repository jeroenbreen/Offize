define([
    './../_BaseModel'
],
function(
    Parent
) {
    "use strict";
    function _LineModel() {

    }
    
    var _p = _LineModel.prototype = Object.create(Parent.prototype);

    _p.exportSettings = function() {
        return {
            ignoreProperties: ['parent'],
            children: []
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

    return _LineModel;
});


