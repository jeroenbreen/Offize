define([
    './../_BaseModel'
], function(
    Parent
){
    "use strict";
    function Job(job) {
        this.id = Number(job.id);
        this.name = job.name;
        this.jobCategory = null;
    }

    var _p = Job.prototype = Object.create(Parent.prototype);

    _p.getFullName = function() {
        return this.jobCategory.name + ': ' + this.name;
    };

    return Job;
});
