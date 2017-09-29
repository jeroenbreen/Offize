define([
    './../_BaseModel'
], function(
    Parent
){
    "use strict";
    function Clock(clock) {
        this.id = clock && clock.id ? Number(clock.id) : null;
        this.type = 'clock';
        this.time = clock && clock.time ? Number(clock.time) : 0;
        this.text = clock && clock.text ? clock.text : '';
        this.project = clock && clock.projectId ? app.getProjectById(Number(clock.projectId)) : null;
        this.line = clock && clock.lineId ? app.getLineById(Number(clock.lineId)) : null;
        this.blockId = clock && clock.blockId ? Number(clock.blockId) : null;
    }

    var _p = Clock.prototype = Object.create(Parent.prototype);

    _p.toBackend = function() {
        return {
            id: this.id,
            type: this.type,
            time: this.time,
            text: this.text,
            projectId: this.project ? this.project.projectId : null,
            lineId: this.line ? this.line.id : null,
            blockId: this.blockId
        }
    };

    return Clock;
});
