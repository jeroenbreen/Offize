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




        // filter

        $scope.showOnlyLiveProjects = true;

        $scope.filter = {
            search : '',
            member: null,
            contact: null,
            year : $scope.model.thisYear
        };


        $scope.filterProjects = function(projects) {
            var filtered = [],
                sorted;
            $scope.totals = [0,0,0,0,0,0];

            function isRelevant(project) {
                return project.projectStatus < 3 || (!$scope.showOnlyLiveProjects && project.projectStatus === 3);
            }


            for (var i = 0, l = projects.length; i < l; i++) {
                var project = projects[i];
                if (
                    ($scope.filter.year === 'Alle' || project.year === $scope.filter.year || isRelevant(project)) &&
                    ($scope.filter.search === '' || project.projectName.toLocaleLowerCase().indexOf($scope.filter.search.toLocaleLowerCase()) > -1) &&
                    (!$scope.filter.contact || $scope.filter.contact.contactId === -1 || project.contact === $scope.filter.contact) &&
                    (!$scope.filter.member || $scope.filter.member.memberId === -1 || project.member.memberId === $scope.filter.member.memberId) &&
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