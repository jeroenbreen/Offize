define([
    'models/time-registration/Block',
    'models/time-registration/Clock',
    'ui/ui-tools/modal',
    'ui/ui-tools/date-tool',
    'jquery'
], function (
    Block,
    Clock,
    modal,
    dateTool,
    $
) {
    "use strict";

    function DayController($scope, dataFactory) {
        this.$scope = $scope;
        $scope.dateTool = dateTool;

        $scope.addBlock = function(date, time) {
            var blockData, block, clock, clockData, blockSuccessCallback, clockSuccessCallback;

            blockSuccessCallback = function(response, status) {
                block.id = response.id;
                clock.blockId = response.id;
                block.clocks.push(clock);
                $scope.model.blocks.push(block);
                modal.show(response.message, false);

                dataFactory.create($.param(clock.toBackend())).success(clockSuccessCallback);
            };

            clockSuccessCallback = function(response, status) {
                clock.id = response.id;
                modal.show(response.message, false);
            };

            blockData = {
                date: dateTool.toBackendString(date),
                memberId: $scope.model.currentMember.memberId
            };
            clockData = {
                time: time
            };
            block = new Block(blockData);
            clock = new Clock(clockData);
            dataFactory.create($.param(block.toBackend())).success(blockSuccessCallback);
        };

    }

    DayController.$inject = ['$scope', 'dataFactory'];

    return DayController;
}); 