define([
    './../_BaseModel'
], function(
    Parent
){
    "use strict";
    function JobCategory(jobCategory) {
        this.id = jobCategory.id;
        this.name = jobCategory.name;
        this.jobs = [];
    }

    var _p = JobCategory.prototype = Object.create(Parent.prototype);

    return JobCategory;
});
