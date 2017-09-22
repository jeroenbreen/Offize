define([
   './_BaseModel'
], function(
    Parent
){
    "use strict";
    function CommentModel(comment) {
        this.id = comment.id;
        this.type = 'comments';
        this.contactId = comment.contactId;
        this.projectId = comment.projectId;
        this.date = comment.date;
        this.comment = comment.comment;
    }

    var _p = CommentModel.prototype = Object.create(Parent.prototype);

    // todo move this to controller

    _p.remove = function() {
        var index = this._getIndex();
        if (index > -1) {
            this.parent.comments.splice(index, 1);
        }
    };

    _p._getIndex = function() {
        for (var i = 0, l = this.parent.comments.length; i < l; i++) {
            if (this.parent.comments[i] === this) {
                return i;
            }
        }
    };

    _p.exportSettings = function() {
        return {
            ignoreProperties: ['parent'],
            children: []
        }
    };

    return CommentModel;
});
