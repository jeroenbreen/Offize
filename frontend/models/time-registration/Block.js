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
        this.member = block && block.memberId ? app.getMemberById(Number(block.memberId)) : null;
        this.clocks = [];
    }

    var _p = Block.prototype = Object.create(Parent.prototype);

    _p.toBackend = function() {
        return {
            id: this.id,
            type: this.type,
            date: dateTool.toBackendString(this.date),
            memberId: this.member.memberId
        }
    };

    _p.isBig = function() {
        var time = 0;
        for (var i = 0, l = this.clocks.length; i < l; i++) {
            var clock = this.clocks[i];
            time += clock.time;
        }
        return time >= 3;
    };

    return Block;
});
