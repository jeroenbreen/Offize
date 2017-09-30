define([
    'models/time-registration/Clock',
    'ui/ui-tools/modal',
    'ui/ui-tools/date-tool',
    'jquery'
], function (
    Clock,
    modal,
    dateTool,
    $
) {
    "use strict";

    function BlockDetailController($scope, dataFactory) {
        this.$scope = $scope;
        $scope.dateTool = dateTool;

        $scope.createClock = function() {
            var clock, successCallback;

            successCallback = function(response, status) {
                clock.id = response.id;
                $scope.block.clocks.push(clock);
                modal.show(response.message, false);
            };

            clock = new Clock();
            clock.blockId = $scope.block.id;
            dataFactory.create($.param(clock.toBackend())).success(successCallback);
        };

        $scope.deleteClock = function(clock) {
            var message = 'Zeker weten?',
                handleSuccess = function(response, status) {
                    var index = $scope.block.clocks.indexOf(clock);
                    $scope.block.clocks.splice(clock, 1);
                    modal.show(response, false);
                };
            modal.confirm(message, function(result){
                if (result) {
                    dataFactory.delete($.param(clock.toBackend())).success(handleSuccess);
                }
            });
        };

        $scope.closeDetail = function() {
            $scope.$emit('open-block', null)
        };
    }

    BlockDetailController.$inject = ['$scope', 'dataFactory'];

    return BlockDetailController;
}); 