define([
    '../../../ui-tools/date-tool'
], function(
    dateTool
) {
    "use strict";
    function DistributionController($scope) {
        this.$scope = $scope;

        var n = 4,
            year = dateTool.dateToProperties(dateTool.daysFromToday(0)).year;

        $scope.weeks = [];

        for (var i = 0; i < n; i++) {
            var date = dateTool.daysFromToday(i * 7),
                week = dateTool.dateToProperties(date).week;
            $scope.weeks.push(week);
        }

        $scope.getHeight = function(week, member) {
            var height = 0;
            for (var i = 0, l = $scope.model.length; i < l; i++) {
                var project = $scope.model[i];
                if (year === project.year &&
                    (week >= project.week && week <= project.week + project.distribution.length) &&
                    project.projectStatus === 2
                    ) {
                    var wk = project.distribution[week - project.week];
                    if (wk) {
                        for (var j = 0, jl = wk.length; j < jl; j++) {
                            var mmb = wk[j];
                            if (mmb.initials === member.initials) {
                                height += parseInt(mmb.hours);
                            }
                        }
                    }
                }
            }
            return height * 2;
        }
    }

    DistributionController.$inject = ['$scope'];

    return DistributionController;
}); 