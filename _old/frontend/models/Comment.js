define([
   './_BaseModel'
], function(
    Parent
){
    "use strict";
    function CommentModel(comment) {
        this.id = comment ? Number(comment.id) : null;
        this.type = 'comment';
        this.id = comment ? Number(comment.id) : null;
        this.projectId = comment ? Number(comment.projectId) : null;
        this.date = comment ? comment.date : null;
        this.comment = comment ? comment.comment : '';
    }

    var _p = CommentModel.prototype = Object.create(Parent.prototype);

    return CommentModel;
});
