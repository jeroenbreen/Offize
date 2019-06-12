define([
    'ui/ui-tools/common-tools'
], function (
    commonTools
) {
    "use strict";

    function ProjectController($scope) {
        this.$scope = $scope;
        $scope.commonTools = commonTools;

        $scope.prevStatus = function(project) {
            project.projectStatus = project.projectStatus - 1;
            update(project);
        };

        $scope.nextStatus = function(project) {
            project.projectStatus = project.projectStatus + 1;
            update(project);
        };

    }

    ProjectController.$inject = ['$scope'];

    return ProjectController;
}); 