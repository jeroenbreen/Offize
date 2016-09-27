<div class="panel">
    <div class="panel-body">
            <div class="comment animation-item"
                 ng-repeat="comment in model.comments"
                 ng-dblclick="openComment(comment)">
                <div ng-if="comment !== editing" class="comment-text">{{comment.comment}}</div>
                <input ng-if="comment === editing"
                       ng-model="comment.comment"
                       ng-change="updateComment(comment)"
                       ng-keydown="keydown($event)"
                       type="text">
                <button ng-if="comment === editing" ng-click="removeComment(comment)" class="glyph red remove-post fa fa-trash"></button>
                <div class="comment-date">{{comment.date}}</div>
            </div>
    </div>
    <div class="panel-attachement">
        <input ng-model="newComment.comment" placeholder="Comment">
    </div>
    <div class="panel-footer">
        <button title="Comment toevoegen" class="glyph fa fa-plus" ng-click="addComment()"></button>
    </div>
</div>
