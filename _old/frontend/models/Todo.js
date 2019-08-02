define([
    './_BaseModel',
    'ui/ui-tools/date-tool'
], function(
    Parent,
    dateTool
) {
    "use strict";

    function Todo(todo) {
        this.id = todo && todo.id ? Number(todo.id) : null;
        this.type = 'todo';
        this.member = todo && todo.memberId ? app.getMemberById(Number(todo.memberId)) : null;
        this.title = todo && todo.title ? todo.title : '';
        this.done = todo && todo.done ? (todo.done === '1') : false;
        this.date = todo && todo.date ? new Date(todo.date) : null;

    }

    var _p = Todo.prototype = Object.create(Parent.prototype);

    _p.toBackend = function () {
        return {
            id: this.id,
            type: this.type,
            memberId: this.member.memberId,
            title: this.title,
            done: this.done ? 1 : 0,
            date: dateTool.toBackendString(this.date)
        }
    };

    return Todo;
});