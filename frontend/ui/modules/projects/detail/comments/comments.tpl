<div
    ng-repeat="comment in project.comments"
    ng-dblclick="openComment(comment)"
    class="comment">

    <div
        ng-if="comment !== editing"
        class="comment-text">
        {{comment.comment}}
    </div>

    <input
        ng-if="comment === editing"
        ng-model="comment.comment"
        ng-change="updateComment(comment)"
        ng-keydown="keydown($event)"
        type="text">

    <div
        ng-show="comment === editing"
        ng-click="removeComment(comment)"
        class="document-tool document-tool--small document-tool--warning">
        <i class="fa fa-trash"></i>
    </div>

    <div class="comment-date">
        {{comment.date}}
    </div>
</div>


<input
    ng-model="newComment.comment"
    class="big-input"
    type="text"
    placeholder="Notitie">

<div class="document-tool__container">
    <div
        ng-click="addComment()"
        class="document-tool">
        <i class="fa fa-plus"></i>
    </div>
    <span>Notitie toevoegen</span>
</div>