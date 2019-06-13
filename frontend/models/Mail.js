define([
    './_BaseModel',
    'ui/ui-tools/date-tool'
], function(
    Parent,
    dateTool
){
    "use strict";
    function Mail(mail) {
        this.id = Number(mail.id);
        this.subject = mail.subject;
        this.content = mail.content;
        this.member = app.getItemByKeyValue('members', 'memberId', Number(mail.member_id));
        this.receiver = mail.receiver;
        this.date = new Date(mail.date);
        this.mailType = mail.mailType;
    }

    var _p = Mail.prototype = Object.create(Parent.prototype);

    _p.toBackend = function() {
        return {
            type: 'mail',
            id: this.id,
            subject: this.subject,
            content: this.content,
            member_id: this.member.id,
            receiver: this.receiver,
            date: dateTool.toBackendString(this.date),
            mailType: this.mailType
        }
    };

    return Mail;
});
