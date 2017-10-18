<div class="day-label" ng-class="{'office-color' : isToday(day)}">
    <div class="day-label-text">
        {{dateTool.toString(day)}}
    </div>
    <div class="todo-menu">
        <div class="todo-menu-label" ng-if="todos.length > 0">
            Todos: {{getUndoneTodos()}} / {{todos.length}}
        </div>
        <button title="Todo openen" class="glyph glyph-small fa fa-list-ul" ng-click="toggleTodo()"></button>
    </div>
    <button title="Block toevoegen" class="glyph fa fa-plus" ng-click="createBlock(day, 3)"></button>

    <div class="todo-wrapper" ng-class="{'todo-wrapper--open': status.todo}">
        <div class="todo-panel">
            <div class="todo-container">
                <div class="todo-container-label">
                    Todo's vandaag
                </div>
                <todo ng-repeat="todo in todos" todo="todo" class="todo" date="false" ng-class="{'todo--done': todo.done}"></todo>
            </div>

            <div class="todo-container" ng-if="isToday(day) && getCollectedTodos().length > 0">
                <div class="todo-container-label">
                    Misgelopen todo's
                </div>
                <todo ng-repeat="todo in getCollectedTodos()" todo="todo" class="todo" date="true" ng-class="{'todo--done': todo.done}"></todo>
            </div>

            <div class="todo-container">
                <div class="todo-container-label">
                    Todo toevoegen
                </div>
                <div class="todo todo--empty">
                    <div class="todo-title">
                        <input ng-model="newTodo" ng-keyup="todoKeyUp($event)">
                    </div>
                    <div class="todo-tools">
                        <button title="Todo toevoegen" class="glyph glyph-small fa fa-plus" ng-click="createTodo(day)"></button>
                    </div>
                </div>
            </div>

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