define([
   './_BaseModel'
], function(
    Parent
){
    "use strict";
    function HourModel(parent, hour) {
        Object.defineProperty(this, 'parent', { value: parent, enumerable: false, writable: true, configurable: true });
        this.hourId = hour.hourId;
        this.type = 'hours';
        this.memberId = hour.memberId;
        this.projectId = hour.projectId;
        this.date = hour.date;
        this.time = hour.time;
        this.description = hour.description;
    }

    var _p = HourModel.prototype = Object.create(Parent.prototype);

    _p._digitize = function(x) {
        if (x < 10) {
            return '0' + x;
        } else {
            return x;
        }
    };

    _p.remove = function() {
        var index = this._getIndex();
        if (index > -1) {
            this.parent.workedHours.splice(index, 1);
        }
        // TODO remove as well from office/app
    };

    _p._getIndex = function() {
        for (var i = 0, l = this.parent.workedHours.length; i < l; i++) {
            if (this.parent.workedHours[i] === this) {
                return i;
            }
        }
    };

    _p.exportSettings = function() {
        return {
            ignoreProperties: ['parent'],
            children: []
        }
    };

    return HourModel;
});
