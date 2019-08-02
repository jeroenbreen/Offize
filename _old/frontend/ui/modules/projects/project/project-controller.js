define([
    'ui/ui-tools/common-tools'
], function (
    commonTools
) {
    "use strict";

    function ProjectController($scope) {
        this.$scope = $scope;
        $scope.commonTools = commonTools;

        $scope.prevStatus = function() {
            $scope.project.projectStatus = $scope.project.projectStatus - 1;
            $scope.$emit('update-project', $scope.project);
        };

        $scope.nextStatus = function() {
            $scope.project.projectStatus = $scope.project.projectStatus + 1;
            $scope.$emit('update-project', $scope.project);
        };

    }

    ProjectController.$inject = ['$scope'];

    return ProjectController;
}); 