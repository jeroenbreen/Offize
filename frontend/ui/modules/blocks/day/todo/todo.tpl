<div class="todo-title">
    <div class="todo-title-label">
        {{todo.title}}
        <span ng-if="date">({{dateTool.toString(todo.date)}})</span>
    </div>
</div>
<div class="todo-tools">
    <button title="Todo check" class="glyph glyph-small glyph-red fa fa-check" ng-click="toggleCheckmark()"></button>
    <button title="Todo verwijderen" class="glyph glyph-small fa fa-remove" ng-click="deleteTodo()"></button>
</div>
