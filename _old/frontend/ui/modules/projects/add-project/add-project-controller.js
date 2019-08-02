define([
    'models/Project',
    'ui/ui-tools/modal'
], function (
    Project,
    modal
) {
    "use strict";

    function AddProjectController($scope, office, api) {
        this.$scope = $scope;
        $scope.office = office;

        $scope.newProject = new Project();

        $scope.addProject = function() {
            var message, project;
            if ($scope.newProject.member !== null && $scope.newProject.contact !== null) {

                var successCallback = function(response, status) {
                    $scope.newProject.projectId = response.id;
                    office.projects.push($scope.newProject);
                    office.currentProject = $scope.newProject;
                    $scope.newProject = new Project();
                    modal.show(response.message, false);
                };

                project = $scope.newProject.toBackend();
                api.create($.param(project)).success(successCallback);
            } else {
                message = 'Vul klant en contact in...';
                modal.show(message, true);
            }
        };
    }

    AddProjectController.$inject = ['$scope', 'office', 'api'];

    return AddProjectController;
}); 