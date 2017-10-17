define([
    'ui/ui-tools/modal',
    'jquery'
], function (
    modal,
    $
) {
    "use strict";

    function TodoController($scope, dataFactory) {
        this.$scope = $scope;

        $scope.toggleCheckmark = function() {
            $scope.todo.done = !$scope.todo.done;

            function handleSuccess(response, status) {
                modal.show(response);
            }

            dataFactory.update($.param($scope.todo.toBackend())).success(handleSuccess);
        };

        $scope.deleteTodo = function() {
            function handleSuccess (response, status) {
                $scope.$emit('delete-todo', $scope.todo);
                modal.show(response, false);
            }

            dataFactory.delete($.param($scope.todo.toBackend())).success(handleSuccess);
        };

    }

    TodoController.$inject = ['$scope', 'dataFactory'];

    return TodoController;
}); 