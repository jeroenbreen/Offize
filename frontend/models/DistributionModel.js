define([
    './_BaseModel'
], function(
    Parent
){
    "use strict";
    function DistributionModel(parent, distribution) {
        Object.defineProperty(this, 'parent', { value: parent, enumerable: false, writable: true, configurable: true });
        this.parent = parent;
        this.hours = distribution.hours;
        this.memberId = distribution.memberId;
        this.initials = distribution.initials;
    }

    var _p = DistributionModel.prototype = Object.create(Parent.prototype);

    _p.exportSettings = function() {
        return {
            ignoreProperties: ['parent'],
            children: []
        }
    };


    return DistributionModel;
});
