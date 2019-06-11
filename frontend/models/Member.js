define([
    './_BaseModel'
], function(
    Parent
){
    "use strict";
    function Member(member) {
        this.memberId = Number(member.memberId);
        this.name = member.name;
        this.email = member.email;
        this.initials = member.initials;
        this.mailFooter = member.mail_footer;
    }

    var _p = Member.prototype = Object.create(Parent.prototype);

    return Member;
});
