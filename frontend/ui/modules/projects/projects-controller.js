define([
    'ui/ui-tools/common-tools',
    'ui/ui-tools/modal',
    'jquery'
], function(
    commonTools,
    modal,
    $
) {
    "use strict";
    function ProjectsController($scope, $localStorage, dataFactory, office) {
        this.$scope = $scope;
        $scope.office = office;
        $scope.office.menu = 'projects';
        $scope.commonTools = commonTools;

        var timer = null;
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


        $scope.selectProject = function(project) {
            office.currentProject = project;
            $localStorage.office.currentProject = project.projectId;
        };
    }

    ProjectsController.$inject = ['$scope', '$localStorage', 'dataFactory', 'office'];

    return ProjectsController;
}); 