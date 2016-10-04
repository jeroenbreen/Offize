define([
    './_BaseModel',
    './DistributionModel'
], function(
    Parent,
    DistributionModel
){
    "use strict";
    function DistributionWeekModel(parent, distributionWeek) {
        Object.defineProperty(this, 'parent', { value: parent, enumerable: false, writable: true, configurable: true });
        this.parent = parent;
        this.distributions = [];
        this.importDistributions(distributionWeek);
    }

    var _p = DistributionWeekModel.prototype = Object.create(Parent.prototype);

    _p.importDistributions = function(distributionWeek) {
        // todo this is temp code for transition
        if (distributionWeek.distributions) {
            for (var i = 0, l = distributionWeek.distributions.length; i < l; i++) {
                this.distributions.push(new DistributionModel(this.parent, distributionWeek.distributions[i]))
            }
        }
    };

    _p.exportSettings = function() {
        return {
            ignoreProperties: ['parent'],
            children: ['distributions']
        }
    };


    return DistributionWeekModel;
});
