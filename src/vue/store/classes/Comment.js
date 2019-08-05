import _Base from '@classes/_Base'
import dateTool from '@tools/date-tool';

class Comment extends _Base {

    constructor(comment) {
        super(comment);
        this.type = 'comment';
        this.projectId = comment ? Number(comment.projectId) : null;
        this.employeeId = comment ? Number(comment.employeeId) : null;
        this.date = comment ? new Date(comment.date) : new Date();
        this.comment = comment ? comment.comment : '';
    }

    toBackend() {
        let comment = {...this};
        this.date = dateTool.toBackendString(this.date);
        return comment;
    }
}

export default Comment;