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


        // navigation

        var today = new Date();
        var thisMonday = dateTool.getThisMonday();
        var delta = 0;

        $scope.prevWeek = function() {
            delta -= 7;
            update();
        };

        $scope.nextWeek = function() {
            delta += 7;
            update();
        };

        $scope.isToday = function(day) {
            return dateTool.matches(day, today);
        };


        function update() {
            $scope.date = dateTool.getDateByOffset(thisMonday, delta);
            $scope.week = dateTool.getWeek($scope.date);
        }

        update();


        // events
        $scope.currentBlock = null;

        $scope.$on('open-block', function(event, block) {
            $scope.currentBlock = block;
        });

        $scope.addFullWeek = function(){
            for (var i = 0, l = $scope.week.length; i < l; i++) {
                var day = $scope.week[i];
                $scope.addBlock(day, 3);
                $scope.addBlock(day, 1);
            }
        };

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

        $scope.getBlocks = function(date) {
            var blocks = [];
            for (var i = 0, l = $scope.model.blocks.length; i < l; i++) {
                var block = $scope.model.blocks[i];
                if (block.member === $scope.model.currentMember && dateTool.matches(block.date, date)) {
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

        function getJobs() {
            var jobs = [];
            for (var i = 0, l = $scope.model.jobCategories.length; i < l; i++) {
                var jobCategory = $scope.model.jobCategories[i];
                for (var j = 0, jl = jobCategory.jobs.length; j < jl; j++) {
                    var job = jobCategory.jobs[j];
                    jobs.push(job);
                }
            }
            return jobs;
        }

        $scope.$on('bootstrap', function(){
            $scope.projects = getProjects();
            $scope.jobs = getJobs();
        });

    }

    BlocksController.$inject = ['$scope', 'dataFactory', 'OfficeModel'];

    return BlocksController;
}); 