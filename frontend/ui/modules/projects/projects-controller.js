define([
    '../../ui-tools/common-tools',
    '../../ui-tools/modal',
    'jquery'
], function(
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

        var thisYear = new Date().getFullYear(),
            timer;
        
        $scope.showOnlyLiveProjects = true;

        $scope.liveProjects = [];

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
                    var message = 'Save: ' + project.projectName;
                    modal.show(message, false);
                };
                var exp = $.param(project.export());
                dataFactory.update(exp).success(handleSuccess);
            }, 1000);
        }

        $scope.newProject = emptyProject();

        function emptyProject() {
            return {
                type: 'projects',
                memberId: null,
                contactId: null,
                projectName: '',
                projectStatus: 0,
                rate: 0,
                hours: 0,
                discount: 0,
                currency: 'EUR',
                year: thisYear,
                invoices: [],
                tenders: [],
                distributionWeeks: []
            }
        }

        $scope.addProject = function() {
            var message;
            console.log($scope.newProject);
            if ($scope.newProject.memberId !== null && $scope.newProject.contactId !== null) {
                var handleSuccess = function(data, status) {
                    var message = 'Toegevoegd: ' + $scope.newProject.projectName;
                    $scope.model.importProject($scope.newProject);
                    $scope.newProject = emptyProject();
                    modal.show(message, false);
                };
                $scope.newProject.rate = $scope.model.getContactById($scope.newProject.contactId).rate;
                $scope.newProject.projectId = $scope.model.getProjectId();
                dataFactory.add(commonTools.param($scope.newProject)).success(handleSuccess);
            } else {
                message = 'Vul klant en contact in.';
                modal.show(message, true);
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

        $scope.digitize = function(value) {
            while (/(\d+)(\d{3})/.test(value.toString())){
                value = value.toString().replace(/(\d+)(\d{3})/, '$1'+'.'+'$2');
            }
            return value;
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
                    ($scope.filter.search === '' || project.projectName.toLocaleLowerCase().indexOf($scope.filter.search.toLocaleLowerCase()) > -1) &&
                    (!$scope.showOnlyLiveProjects || (project.projectStatus > 0 && project.projectStatus < 3))
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