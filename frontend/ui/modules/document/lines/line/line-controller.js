define([
    'ui/ui-tools/modal',
    'jquery'
], function (
    modal,
    $
) {
    "use strict";

    function LineController($scope, api) {
        this.$scope = $scope;

        var timer;

        $scope.removeLine = function() {
            var successCallback;

            successCallback = function(response, status) {
                var index = $scope.document.lines.indexOf($scope.line);
                $scope.document.lines.splice(index, 1);
                modal.show(response, false);
            };

            api.delete($.param($scope.line.toBackend())).success(successCallback);
        };

        // TODO also fires the first time, when nothing is changed yet
        $scope.$watch('line', function(newVal, oldVal){
            if (oldVal && newVal.id) {
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(function () {
                    update(newVal);
                }, 1000);
            }
        }, true);

        function update(line) {
            var handleSuccess = function(response, status) {
                modal.show(response, false);
            };
            api.update($.param(line.toBackend())).success(handleSuccess);
        }

    }

    LineController.$inject = ['$scope', 'api'];

    return LineController;
}); 