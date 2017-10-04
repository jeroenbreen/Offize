define([
    'ui/ui-tools/date-tool',
    './../_BaseModel'
], function(
    dateTool,
    Parent
){
    "use strict";
    function Block(block) {
        this.id = block && block.id ? Number(block.id) : null;
        this.type = 'block';
        this.date = block && block.date ? new Date(block.date) : null;
        this.project = block && block.projectId ? app.getProjectById(Number(block.projectId)) : null;
        this.member = block && block.memberId ? app.getMemberById(Number(block.memberId)) : null;
        this.time = block && block.time ? block.time : '';
        this.activities = [];
    }

    var _p = Block.prototype = Object.create(Parent.prototype);

    _p.toBackend = function() {
        return {
            id: this.id,
            type: this.type,
            date: dateTool.toBackendString(this.date),
            memberId: this.member.memberId,
            projectId: this.project ? this.project.projectId : 0,
            time: this.time
        }
    };

    _p.isBig = function() {
        var time = 0;
        for (var i = 0, l = this.activities.length; i < l; i++) {
            var clock = this.activities[i];
            time += clock.time;
        }
        return time >= 3;
    };

    _p.getEndTime = function() {
        var timeTaken = 0,
            timeTakenHours,
            timeTakenMinutes,
            split = this.time.split(':'),
            startTimeHours = Number(split[0]),
            startTimeMinutes = Number(split[1]) / 60,
            endTimeHours = 0,
            endTimeMinutes = 0,
            minutesString;
        for (var i = 0, l = this.activities.length; i < l; i++) {
            var activity = this.activities[i];
            timeTaken += activity.time;
        }
        timeTakenHours = Math.floor(timeTaken);
        timeTakenMinutes = timeTaken - timeTakenHours;
        endTimeHours = startTimeHours + timeTakenHours;
        endTimeMinutes = startTimeMinutes + timeTakenMinutes;
        if (endTimeMinutes >= 1) {
            endTimeMinutes -= 1;
            endTimeHours++;
        }
        minutesString = (Math.round(endTimeMinutes * 60));
        if (minutesString < 10) {
            minutesString = '0' + minutesString;
        }
        return endTimeHours + ':' + minutesString;


    };

    return Block;
});
