define([
    './../_BaseModel'
], function(
    Parent
){
    "use strict";
    function Clock(clock) {
        this.id = clock && clock.id ? clock.id : null;
        this.type = 'clock';
        this.time = clock && clock.time ? Number(clock.time) : 0;
        this.text = clock && clock.text ? clock.text : '';
        this.job = clock && clock.jobId ? app.getJobById(clock.jobId) : null;
        this.blockId = clock && clock.blockId ? Number(clock.blockId) : null;
    }

    var _p = Clock.prototype = Object.create(Parent.prototype);

    _p.toBackend = function() {
        return {
            id: this.id,
            type: this.type,
            time: this.time,
            text: this.text,
            jobId: this.job ? this.job.id : null,
            blockId: this.blockId
        }
    };

    return Clock;
});
