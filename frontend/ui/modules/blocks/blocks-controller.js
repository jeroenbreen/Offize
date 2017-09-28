define([
    'models/time-registration/Block',
    'models/time-registration/Clock',
    'ui/ui-tools/date-tool',
    'ui/ui-tools/modal',
    'jquery'
], function (
    Block,
    Clock,
    dateTool,
    modal,
    $
) {
    "use strict";

    function BlocksController($scope, dataFactory, OfficeModel) {
        this.$scope = $scope;
        $scope.model = OfficeModel;
        $scope.dateTool = dateTool;

        $scope.model.menu = 'blocks';

        var today = new Date();

        $scope.$on('bootstrap', function(){
            $scope.currentMember = $scope.model.members[0];
            $scope.projects = getProjects();
        });

        $scope.isToday = function(day) {
            return dateTool.matches(day, today);
        };


        function update() {
            $scope.week = dateTool.getWeek($scope.date);
        }

        $scope.date = dateTool.getThisMonday();
        update();

        $scope.addBlock = function(date) {
            var blockData, clockData, block, clock, blockSuccessCallback, clockSuccessCallback;

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
                memberId: $scope.currentMember.memberId
            };
            block = new Block(blockData);
            clock = new Clock();
            dataFactory.create($.param(block.toBackend())).success(blockSuccessCallback);
        };

        $scope.getBlocks = function(date) {
            var blocks = [];
            for (var i = 0, l = $scope.model.blocks.length; i < l; i++) {
                var block = $scope.model.blocks[i];
                if (block.member === $scope.currentMember && dateTool.matches(block.date, date)) {
                    blocks.push(block);
                }
            }
            return blocks;
        };

        function getProjects() {
            var projects = [];
            for (var i = 0, l = $scope.model.projects.length; i < l; i++) {
                var project = $scope.model.projects[i];
                if (project.projectStatus === 2) {
                    projects.push(project);
                }

            }
            return projects;
        }

    }

    BlocksController.$inject = ['$scope', 'dataFactory', 'OfficeModel'];

    return BlocksController;
}); 