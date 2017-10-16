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
        $scope.todoSets = [];


        // navigation

        var thisMonday = dateTool.getThisMonday();
        var nextMonday;
        var prevMonday;
        var delta = 0;

        $scope.prevWeek = function() {
            delta -= 7;
            update();
        };

        $scope.nextWeek = function() {
            delta += 7;
            update();
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

        function getTodos (date) {
            var todos = [];
            for (var i = 0, l = $scope.model.todos.length; i < l; i++) {
                var todo = $scope.model.todos[i];
                if (todo.member === $scope.model.currentMember && dateTool.matches(todo.date, date)) {
                    todos.push(todo);
                }
            }
            return todos;
        }

        function update() {
            $scope.date = dateTool.getDateByOffset(thisMonday, delta);
            $scope.week = dateTool.getWeek($scope.date);
            prevMonday = dateTool.getDateByOffset($scope.date, -3);
            nextMonday = dateTool.getDateByOffset($scope.date, 7);
            $scope.updateBlocks();
        }

        $scope.updateBlocks = function() {
            $scope.blockSets = [];
            $scope.todoSets = [];
            for (var i = 0, l = $scope.week.length; i < l; i++) {
                var day = $scope.week[i];
                $scope.blockSets.push(getBlocks(day));
                $scope.todoSets.push(getTodos(day));
            }
        };

        $scope.$watch('model.blocks.length', function(){
            update();
        });

        $scope.$watch('model.todos.length', function(){
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
            return projects.sort(function(a, b){
                if (a.member.memberId < b.member.memberId) {
                    return -1;
                } else if (a.member.memberId > b.member.memberId) {
                    return 1;
                } else {
                    return 0;
                }
            });
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

        $scope.$on('update-activity', function(event, activity) {
            function handleSuccess(response, status) {
                modal.show(response);
            }

            function callback() {
                dataFactory.update($.param(activity.toBackend())).success(handleSuccess);
            }

            delayTool.delay(callback);
        });

        var collectProjects = false;
        $scope.$watch('model.projects.length', function(){
            if ($scope.model.projects.length > 0 && !collectProjects) {
                $scope.projects = getProjects();
                $scope.jobs = getJobs();
                collectProjects = true;
            }
        });

        // next week

        $scope.prevWeekArray = [];
        $scope.nextWeekArray = [];

        $scope.sortableOptionsPrev = {
            receive: function(e, ui) {
                var block = ui.item.sortable.moved;
                block.date = prevMonday;
                updateBlock(block);
            }
        };

        $scope.sortableOptionsNext = {
            receive: function(e, ui) {
                var block = ui.item.sortable.moved;
                block.date = nextMonday;
                updateBlock(block);
            }
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

        $scope.$on('update-block', function(event, block) {
            updateBlock(block);
        })
    }

    BlocksController.$inject = ['$scope', 'dataFactory', 'OfficeModel'];

    return BlocksController;
}); 