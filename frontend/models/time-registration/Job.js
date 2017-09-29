define([
    './../_BaseModel'
], function(
    Parent
){
    "use strict";
    function Job(job) {
        this.id = job.id;
        this.name = job.name;
    }

    var _p = Job.prototype = Object.create(Parent.prototype);

    return Job;
});