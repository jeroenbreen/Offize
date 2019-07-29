define([
    './_BaseModel'
], function(
    Parent
){
    "use strict";
    function Member(member) {
        this.type = 'member';
        this.memberId = member ? Number(member.memberId) : null;
        this.name = member ? member.name : '';
        this.email = member ? member.email : '';
        this.initials = member ? member.initials : '';
        this.mailFooter = member ? member.mail_footer : 'Met vriendelijke groeten,<br><br>';
    }

    var _p = Member.prototype = Object.create(Parent.prototype);

    return Member;
});
