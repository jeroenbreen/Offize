define([], function () {
    "use strict";

    function ProjectsFilterController($scope, office) {
        this.$scope = $scope;
        $scope.office = office;

    }

    ProjectsFilterController.$inject = ['$scope', 'office'];

    return ProjectsFilterController;
}); 