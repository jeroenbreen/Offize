define([
    './../_BaseModel'
], function(
    Parent
){
    "use strict";
    function Activity(activity) {
        this.id = activity && activity.id ? Number(activity.id) : null;
        this.type = 'activity';
        this.time = activity && activity.time ? Number(activity.time) : 0;
        this.text = activity && activity.text ? activity.text : '';
        this.line = activity && activity.lineId ? app.getLineById(Number(activity.lineId)) : null;
        this.job = activity && activity.jobId ? app.getJobById(Number(activity.jobId)) : null;
        this.blockId = activity && activity.blockId ? Number(activity.blockId) : null;
    }

    var _p = Activity.prototype = Object.create(Parent.prototype);

    _p.getDescription = function() {
        if (this.text) {
            return this.text;
        } else {
            if (this.line) {
                return this.line.text;
            } else {
                return '-';
            }
        }
    };

    _p.toBackend = function() {
        return {
            id: this.id,
            type: this.type,
            time: this.time,
            text: this.text,
            lineId: this.line ? this.line.id : null,
            jobId: this.job ? this.job.id : null,
            blockId: this.blockId
        }
    };

    return Activity;
});
