define([
    './_LineModel'
], function(
    Parent
){
    "use strict";
    function CountModel(parent, line) {
        Object.defineProperty(this, 'parent', { value: parent, enumerable: false, writable: true, configurable: true });
        this.type = 'count';
        this.title = '';
        this.rate = parent.parent.rate;
        this.hours = 0;
        if (line) {
            this.import(line);
        }
    }

    var _p = CountModel.prototype = Object.create(Parent.prototype);

    _p.import = function(line) {
        if (!line.hasOwnProperty('title')) {
            this.title = line.titel;
            this.rate = line.tarief;
            this.hours = line.uren;
        } else {
            this.title = line.title;
            this.rate = line.rate;
            this.hours = line.hours;
        }
    };

    return CountModel;
});
