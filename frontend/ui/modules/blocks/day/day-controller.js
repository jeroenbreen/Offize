define([
    'models/time-registration/Block',
    'models/time-registration/Clock',
    'ui/ui-tools/modal',
    'ui/ui-tools/date-tool',
    'ui/ui-tools/delay-tool',
    'jquery'
], function (
    Block,
    Clock,
    modal,
    dateTool,
    delayTool,
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

        function updateBlock(block) {
            console.log(block);

            function handleSuccess(response, status) {
                modal.show(response);
            }

            function callback() {
                dataFactory.update($.param(block.toBackend())).success(handleSuccess);
            }

            delayTool.delay(callback);
        }

        $scope.sortableOptions = {
            connectWith: '.day-blocks',

            receive: function(e, ui) {
                var block = ui.item.sortable.moved;
                block.date = $scope.day;
                updateBlock(block);
            },

            stop: function(e, ui){
            }
        };

    }

    DayController.$inject = ['$scope', 'dataFactory'];

    return DayController;
}); 