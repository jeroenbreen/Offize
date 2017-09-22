define([
    './_BaseModel'
], function(
    Parent
){
    "use strict";
    function Member(member) {
        this.memberId = Number(member.memberId);
        this.name = member.name;
        this.initials = member.initials;
    }

    var _p = Member.prototype = Object.create(Parent.prototype);

    return Member;
});
