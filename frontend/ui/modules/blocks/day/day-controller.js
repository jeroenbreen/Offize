define([
    'models/time-registration/Block',
    'models/time-registration/Activity',
    'ui/ui-tools/modal',
    'ui/ui-tools/date-tool',
    'ui/ui-tools/delay-tool',
    'jquery'
], function (
    Block,
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

        var today = new Date();

        $scope.isToday = function(day) {
            return dateTool.matches(day, today);
        };

        $scope.addBlock = function(date, time) {
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