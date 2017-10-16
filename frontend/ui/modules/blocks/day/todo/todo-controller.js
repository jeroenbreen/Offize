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

        $scope.updateTodo = function() {
            function handleSuccess(response, status) {
                modal.show(response);
            }

            dataFactory.update($.param($scope.todo.toBackend())).success(handleSuccess);
        };

    }

    TodoController.$inject = ['$scope', 'dataFactory'];

    return TodoController;
}); 