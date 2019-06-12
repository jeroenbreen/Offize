define([
    'models/Project',
    'ui/ui-tools/common-tools',
    'ui/ui-tools/modal',
    'jquery'
], function(
    Project,
    commonTools,
    modal,
    $
) {
    "use strict";
    function ProjectsController($scope, $localStorage, dataFactory, OfficeModel) {
        this.$scope = $scope;
        $scope.model = OfficeModel;
        $scope.model.menu = 'projects';
        $scope.commonTools = commonTools;


        // saving
        var timer;
        $scope.$on('update-project', function(event, project){
            update(project);
        });

        function update(project) {
            var handleSuccess;
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(function(){
                handleSuccess = function(response, status) {
                    modal.show(response);
                };
                dataFactory.update($.param(project.toBackend())).success(handleSuccess);
            }, 1000);
        }

        $scope.addProject = function() {
            var message, project;
            if ($scope.newProject.member !== null && $scope.newProject.contact !== null) {
                var successCallback = function(response, status) {
                    $scope.newProject.projectId = response.id;
                    $scope.model.projects.push($scope.newProject);
                    $scope.model.currentProject = $scope.newProject;
                    $scope.newProject = new Project();
                    modal.show(response.message, false);
                };
                $scope.newProject.rate = $scope.newProject.contact.rate;
                project = $scope.newProject.toBackend();
                dataFactory.create($.param(project)).success(successCallback);
            } else {
                message = 'Vul klant en contact in.';
                modal.show(message, true);
            }
        };


        $scope.selectProject = function(project) {
            $scope.model.currentProject = project;
            $localStorage.office.currentProject = project.projectId;
        };





        $scope.totals = [];

        $scope.$watch('model.currentMember', function(){
            if ($scope.model.currentMember) {
                $scope.newProject = new Project();
            }
        })

    }

    ProjectsController.$inject = ['$scope', '$localStorage', 'dataFactory', 'OfficeModel'];

    return ProjectsController;
}); 