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
    function ProjectsController($scope, dataFactory, OfficeModel) {
        this.$scope = $scope;
        $scope.model = OfficeModel;
        $scope.model.menu = 'projects';
        $scope.commonTools = commonTools;


        // saving

        var timer;

        $scope.$watch('model.currentProject', function(newVal, oldVal) {
            if (oldVal && newVal && oldVal.projectId === newVal.projectId && oldVal !== newVal) {
                update(newVal);
            }
        }, true);

        function update(project) {
            var handleSuccess;
            clearTimeout(timer);
            timer = setTimeout(function(){
                handleSuccess = function(data, status) {
                    modal.show(data);
                };
                var exp = $.param(project.export());
                dataFactory.update(exp).success(handleSuccess);
            }, 1000);
        }


        // events

        // wait for boostrap, otherwise the app.configuration for the standard rate
        // is not yet available
        $scope.$on('bootstrap', function(){
            $scope.newProject = new Project();
        });

        // TODO fix this
        $scope.addProject = function() {
            // var message;
            // if ($scope.newProject.memberId !== null && $scope.newProject.contactId !== null) {
            //     var handleSuccess = function(response, status) {
            //         $scope.model.importProject($scope.newProject);
            //         $scope.newProject = emptyProject();
            //         modal.show(response, false);
            //     };
            //     $scope.newProject.rate = $scope.model.getContactById($scope.newProject.contactId).rate;
            //     $scope.newProject.projectId = $scope.model.getProjectId();
            //     dataFactory.add(commonTools.param($scope.newProject)).success(handleSuccess);
            // } else {
            //     message = 'Vul klant en contact in.';
            //     modal.show(message, true);
            // }
        };

        $scope.digitize = function(value) {
            while (/(\d+)(\d{3})/.test(value.toString())){
                value = value.toString().replace(/(\d+)(\d{3})/, '$1'+'.'+'$2');
            }
            return value;
        };





        // filter

        $scope.showOnlyLiveProjects = true;

        $scope.filter = {
            search : '',
            member: null,
            year : $scope.model.thisYear
        };


        $scope.filterProjects = function(projects) {
            var filtered = [],
                sorted;
            $scope.totals = [0,0,0,0,0,0];
            for (var i = 0, l = projects.length; i < l; i++) {
                var project = projects[i];
                if (
                    ($scope.filter.year === 'Alle' || project.year === $scope.filter.year) &&
                    ($scope.filter.search === '' || project.projectName.toLocaleLowerCase().indexOf($scope.filter.search.toLocaleLowerCase()) > -1) &&
                    ($scope.filter.member.memberId === -1 || project.member.memberId === $scope.filter.member.memberId) &&
                    (!$scope.showOnlyLiveProjects || project.projectStatus < 3)
                ) {
                    filtered.push(project);
                    addToTotal(project);
                }
            }
            sorted = filtered.sort(compare);
            if (sorted.length === 1) {
                $scope.model.currentProject = sorted[0];
            }
            return sorted;
        };

        function addToTotal(project) {
            var status = project.projectStatus;
            $scope.totals[status] += project.hours * project.rate - project.discount;
        }

        $scope.sumOfTotals = function(totals) {
            var sum = 0;
            for (var i = 0, l = totals.length; i < l; i++) {
                sum += totals[i];
            }
            return sum;
        };

        function compare(a,b) {
            if (a.projectStatus < b.projectStatus) {
                return -1;
            } else if (a.projectStatus > b.projectStatus) {
                return 1;
            } else {
                if (a.projectStatus === 2 && (a.finished || b.finished)) {
                    if (a.finished && !b.finished) {
                        return 1;
                    } else if (!a.finished && b.finished) {
                        return -1;
                    } else {
                        return 0;
                    }
                } else {

                    if (a.week > b.week) {
                        return 1;
                    } else if (a.week < b.week) {
                        return -1;
                    } else {
                        return 0;
                    }
                }
            }
        }

        $scope.prevStatus = function(project) {
            project.projectStatus = project.projectStatus - 1;
            update(project);
        };

        $scope.nextStatus = function(project) {
            project.projectStatus = project.projectStatus + 1;
            update(project);
        };

        $scope.status = ['Pijplijn', 'Offerte', 'Lopend', 'Factuur', 'Betaald', 'Dood'];

        $scope.totals = [];

    }

    ProjectsController.$inject = ['$scope', 'dataFactory', 'OfficeModel'];

    return ProjectsController;
}); 