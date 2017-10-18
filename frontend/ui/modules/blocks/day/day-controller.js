define([
    'models/time-registration/Block',
    'models/time-registration/Todo',
    'models/time-registration/Activity',
    'ui/ui-tools/modal',
    'ui/ui-tools/date-tool',
    'ui/ui-tools/delay-tool',
    'jquery'
], function (
    Block,
    Todo,
    Activity,
    modal,
    dateTool,
    delayTool,
    $
) {
    "use strict";

    function DayController($scope, dataFactory) {
        this.$scope = $scope;
        $scope.dateTool = dateTool;

        $scope.status = {
            todo: false
        };

        var today = new Date();

        $scope.getCollectedTodos = function() {
            var todos = [];
            for (var i = 0, l = app.todos.length; i < l; i++) {
                var todo = app.todos[i];
                if (!todo.done && dateTool.biggerThen(today, todo.date)) {
                    todos.push(todo);
                }
            }
            return todos;
        };

        $scope.toggleTodo = function() {
            $scope.status.todo = !$scope.status.todo;
        };

        $scope.todoKeyUp = function(e) {
            if (e.keyCode === 13) {
                $scope.createTodo($scope.day);
            }
        };

        $scope.getUndoneTodos = function() {
            return $scope.todos.filter(function(todo){
                return !todo.done;
            }).length;
        };

        $scope.newTodo = '';

        $scope.createTodo = function(date) {
            var todo, todoData, todoSuccessCallback;

            todoSuccessCallback = function(response, status) {
                todo.id = response.id;
                app.todos.push(todo);
                modal.show(response.message, false);
            };


            todoData = {
                date: dateTool.toBackendString(date),
                memberId: app.currentMember.memberId,
                title: $scope.newTodo,
                ready: 0
            };

            todo = new Todo(todoData);
            dataFactory.create($.param(todo.toBackend())).success(todoSuccessCallback);
        };

        $scope.isToday = function(day) {
            return dateTool.matches(day, today);
        };

        $scope.createBlock = function(date, time) {
            var blockData, block, activity, activityData, blockSuccessCallback, activitySuccessCallback;

            blockSuccessCallback = function(response, status) {
                block.id = response.id;
                activity.blockId = response.id;
                block.activities.push(activity);
                app.blocks.push(block);
                modal.show(response.message, false);

                dataFactory.create($.param(activity.toBackend())).success(activitySuccessCallback);
            };

            activitySuccessCallback = function(response, status) {
                activity.id = response.id;
                modal.show(response.message, false);
            };

            blockData = {
                date: dateTool.toBackendString(date),
                memberId: app.currentMember.memberId
            };
            activityData = {
                time: time
            };
            block = new Block(blockData);
            activity = new Activity(activityData);
            dataFactory.create($.param(block.toBackend())).success(blockSuccessCallback);
        };



        $scope.sortableOptions = {
            connectWith: '.day-blocks, .week-drop',

            receive: function(e, ui) {
                var block = ui.item.sortable.moved;
                block.date = $scope.day;
                $scope.$emit('update-block',block);
            }
        };

    }

    DayController.$inject = ['$scope', 'dataFactory'];

    return DayController;
}); 