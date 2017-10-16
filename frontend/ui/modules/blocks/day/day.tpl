<div class="day-label" ng-class="{'office-color' : isToday(day)}">
    <div>
        {{dateTool.toString(day)}}
    </div>
    <button title="Block toevoegen" class="glyph fa fa-plus" ng-click="createBlock(day, 3)"></button>
</div>

<div class="todo-panel">
    <div class="todo-container">
        <todo ng-repeat="todo in todos" todo="todo" class="todo" ng-class="{'todo--done': todo.done}"></todo>
    </div>
    <div class="todo todo--empty">
        <div class="todo-title">
            <input ng-model="newTodo">
        </div>
        <div class="todo-tools">
            <button title="Todo toevoegen" class="glyph glyph-small fa fa-plus" ng-click="createTodo(day)"></button>
        </div>
    </div>
</div>

<ul class="day-blocks" ui-sortable="sortableOptions" ng-model="blocks">
    <li ng-repeat="block in blocks">
        <block
            block="block"
            projects="projects"
            ng-class="{'big-block': block.isBig(), 'done': block.done}"></block>
    </li>
</ul>