define([
    'ui/ui-tools/common-tools'
], function (
    commonTools
) {
    "use strict";

    function ProjectSumsController($scope, office) {
        this.$scope = $scope;
        $scope.office = office;
        $scope.commonTools = commonTools;

        $scope.getTotalForStatus = function(status) {
            var projects, total;
            total = 0;
            projects = office.getProjects().filter(function(project) {
                if (status === null) {
                    return true;
                } else {
                    return project.projectStatus === status;
                }
            });
            for (var i = 0, l = projects.length; i < l; i++) {
                var project = projects[i];
                total += project.getBudget();
            }
            return total;
        };

        $scope.getStatusses = function() {
            if (office.status.projects.filter.showOnlyLiveProjects) {
                return office.projectStatusses.filter(function(status, index){
                    return index < 3;
                })
            } else {
                return office.projectStatusses;
            }

        }
    }

    ProjectSumsController.$inject = ['$scope', 'office'];

    return ProjectSumsController;
}); 