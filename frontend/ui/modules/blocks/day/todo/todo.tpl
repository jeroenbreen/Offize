<div class="todo-title">
    <div class="todo-title-label">
        {{todo.title}}
    </div>
</div>
<div class="todo-tools">
    <!--<input type="checkbox" ng-model="todo.done" ng-change="updateTodo()">-->
    <button title="Todo check" class="glyph glyph-small glyph-red fa fa-check" ng-click="toggleCheckmark()"></button>
    <button title="Todo verwijderen" class="glyph glyph-small fa fa-remove" ng-click="deleteTodo()"></button>
</div>
