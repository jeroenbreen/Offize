import _Base from '@classes/_Base';
import dateTool from '@tools/date-tool';

class Mail extends _Base {
    constructor(mail) {
        super(mail);
        this.type = 'mail';
        this.subject = mail.subject;
        this.content = mail.content;
        this.employeeId = Number(mail.employeeId);
        this.receiver = mail.receiver;
        this.date = new Date(mail.date);
        this.mailType = mail.mailType;
        this.documentId = Number(mail.documentId);
    }

    toBackend() {
        let mail = {...this};
        mail.date = dateTool.toBackendString(this.date);
        return mail;
    }
}

export default Mail;