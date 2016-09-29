define([
    '../../../ui-tools/date-tool'
], function(
    dateTool
) {
    "use strict";
    function DistributionController($scope) {
        this.$scope = $scope;

        var n = 8,
            year = dateTool.dateToProperties(dateTool.daysFromToday(0)).year;

        $scope.weeks = [];

        for (var i = 0; i < n; i++) {
            var date = dateTool.daysFromToday(i * 7),
                week = dateTool.dateToProperties(date).week;
            $scope.weeks.push(week);
        }
        
        $scope.getBlocks = function(member, week) {
            var blocks = [];
            for (var i = 0, l = $scope.model.length; i < l; i++) {
                var project = $scope.model[i];
                if (year === project.year &&
                    (week >= project.week && week <= project.week + project.distributionWeeks.length) &&
                    project.projectStatus === 2
                ) {
                    var wk = project.distributionWeeks[week - project.week];
                    if (wk) {
                        for (var j = 0, jl = wk.distributions.length; j < jl; j++) {
                            var mmb = wk.distributions[j];
                            if (mmb.initials === member.initials) {
                                blocks.push(mmb);
                            }
                        }
                    }
                }
            }
            return blocks;
        };

        $scope.selectProject = function(block) {
            $scope.office.currentProject = $scope.office.getProjectById(block.parent.projectId);
        };

        $scope.formatTitle = function(block) {
            var project = $scope.office.getProjectById(block.parent.projectId);
            return project.projectName + '\n' + block.hours + ' uren.';
        }
    }

    DistributionController.$inject = ['$scope'];

    return DistributionController;
}); 