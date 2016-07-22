define([
    '../../ui-tools/common-tools'
], function(
    commonTools
) {
    "use strict";
    function ProjectsController($scope, dataFactory) {
        this.$scope = $scope;
        var thisYear = new Date().getFullYear(),
            timer;

        $scope.liveProjects = [];

        $scope.$watch('model.currentProject', function(newVal, oldVal) {
            console.log(newVal);
            if (oldVal && newVal && oldVal.projectId === newVal.projectId && oldVal !== newVal) {
                update(newVal);
            }
        }, true);

        function update(obj) {
            var handleSuccess;
            clearTimeout(timer);
            timer = setTimeout(function(){
                handleSuccess = function(data, status) {
                    var message = 'Save: ' + obj.projectName;
                    commonTools.show(message, false);
                };
                dataFactory.update(commonTools.param(obj)).success(handleSuccess);
            }, 1000);
        }

        $scope.newProject = emptyProject();

        function emptyProject() {
            return {
                type : 'projects',
                memberId: null,
                contactId : null,
                projectName : '',
                projectStatus : 0,
                rate : 0,
                hours : 0,
                discount : 0,
                currency : 'EUR',
                year : thisYear,
                invoices : [],
                tenders : []
            }
        }

        $scope.addProject = function() {
            var message;
            if ($scope.newProject.memberId && $scope.newProject.contactId) {
                var handleSuccess = function(data, status) {
                    var message = 'Toegevoegd: ' + $scope.newProject.projectName;
                    $scope.model.importProject($scope.newProject);
                    $scope.newProject = emptyProject();
                    commonTools.show(message, false);
                };
                $scope.newProject.rate = $scope.model.getContactById($scope.newProject.contactId).rate;
                $scope.newProject.projectId = $scope.model.getProjectId();
                dataFactory.add(commonTools.param($scope.newProject)).success(handleSuccess);
            } else {
                message = 'Vul klant en contact in.';
                commonTools.show(message, true);
            }
        };

        $scope.limitString = function(string) {
            var max = 20;
            if (string.length > max) {
                return string.substr(0, max - 3) + '[...]';
            } else {
                return string;
            }
        };

        $scope.filter = {
            search : '',
            year : thisYear
        };


        $scope.filterProjects = function(projects) {
            var filtered = [],
                sorted;
            $scope.totals = [0,0,0,0,0,0];
            for (var i = 0, l = projects.length; i < l; i++) {
                var project = projects[i];
                if (
                    ($scope.filter.year === 'alle' || project.year === $scope.filter.year) &&
                    ($scope.filter.search === '' || project.projectName.toLocaleLowerCase().indexOf($scope.filter.search.toLocaleLowerCase()) > -1)
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
                if (a.week > b.week) {
                    return 1;
                } else if (a.week < b.week) {
                    return -1;
                } else {
                    return 0;
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

    ProjectsController.$inject = ['$scope', 'dataFactory'];

    return ProjectsController;
}); 