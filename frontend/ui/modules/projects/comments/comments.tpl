<div class="panel">
    <div class="panel-body">
            <div class="comment animation-item" ng-repeat="comment in model.comments">
                <div class="comment-text">{{comment.comment}}</div>
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
