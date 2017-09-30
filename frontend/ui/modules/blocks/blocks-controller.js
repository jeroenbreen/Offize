define([
    'ui/ui-tools/date-tool',
    'ui/ui-tools/delay-tool',
    'ui/ui-tools/modal',
    'jquery'
], function (
    dateTool,
    delayTool,
    modal,
    $
) {
    "use strict";

    function BlocksController($scope, dataFactory, OfficeModel) {
        this.$scope = $scope;
        $scope.model = OfficeModel;
        $scope.dateTool = dateTool;
        $scope.model.menu = 'blocks';
        $scope.blockSets = [];


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

        function getBlocks (date) {
            var blocks = [];
            for (var i = 0, l = $scope.model.blocks.length; i < l; i++) {
                var block = $scope.model.blocks[i];
                if (block.member === $scope.model.currentMember && dateTool.matches(block.date, date)) {
                    blocks.push(block);
                }
            }
            return blocks;
        }

        function update() {
            $scope.date = dateTool.getDateByOffset(thisMonday, delta);
            $scope.week = dateTool.getWeek($scope.date);
            $scope.blockSets = [];
            for (var i = 0, l = $scope.week.length; i < l; i++) {
                var day = $scope.week[i];
                $scope.blockSets.push(getBlocks(day))
            }
        }

        $scope.$watch('model.blocks.length', function(){
            update();
        });


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

        // events

        $scope.$on('delete-block', function(event, block) {
            var index = $scope.model.blocks.indexOf(block);
            $scope.model.blocks.splice(block, 1);
            $scope.currentBlock = null;
        });

        $scope.$on('update-clock', function(event, clock) {
            function handleSuccess(response, status) {
                modal.show(response);
            }

            function callback() {
                dataFactory.update($.param(clock.toBackend())).success(handleSuccess);
            }

            delayTool.delay(callback);
        });

        $scope.$on('bootstrap', function(){
            $scope.projects = getProjects();
            $scope.jobs = getJobs();
        });
    }

    BlocksController.$inject = ['$scope', 'dataFactory', 'OfficeModel'];

    return BlocksController;
}); 