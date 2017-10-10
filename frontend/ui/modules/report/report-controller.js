define([], function () {
    "use strict";

    function ReportController($scope) {
        this.$scope = $scope;

        $scope.unsortedActivities = [];
        $scope.activities = {
            matched: [],
            unmatched: []
        };

        $scope.filter = {
            type: 'category',
            showEmtptyProjects: false,
            year: new Date().getFullYear()
        };

        $scope.newProjects = [];


        $scope.getTitle = function() {
            return $scope.projects.length > 1 ? $scope.newProjects.length + ' Opdrachten (' + ($scope.projects.length - $scope.newProjects.length) + ' zonder data)' : $scope.projects[0].projectName;
        };

        $scope.$watch('projects.length', function(){
            if ($scope.projects.length > 0) {
                if ($scope.projects.length === 1) {
                    $scope.newProjects = $scope.projects;
                } else {
                    $scope.newProjects = $scope.projects.filter(function (project) {
                        return project.hasActivities();
                    })
                }
                getActivities();
            }
        });

        $scope.getSetHours = function() {
            var hours = 0;
            for (var i = 0, l = $scope.newProjects.length; i < l; i++) {
                var project = $scope.newProjects[i];
                hours += project.hours;
            }
            return hours;
        };

        $scope.getLines = function(doctype) {
            var lines = [];
            for (var i = 0, l = $scope.newProjects.length; i < l; i++) {
                var project = $scope.newProjects[i];
                for (var j = 0, jl = project[doctype + 's'].length; j < jl; j++) {
                    var document = project[doctype + 's'][j];
                    for (var k = 0, kl = document.lines.length; k < kl; k++) {
                        var line = document.lines[k];
                        if (line.lineType === 'amount' || line.lineType === 'count') {
                            lines.push(line);
                        }

                    }
                }
            }
            return lines;
        };

        function getActivities() {
            for (var i = 0, l = $scope.newProjects.length; i < l; i++) {
                var project = $scope.newProjects[i];
                for (var j = 0, jl = app.blocks.length; j < jl; j++) {
                    var block = app.blocks[j];
                    if (block.project === project) {
                        for (var k = 0, kl = block.activities.length; k < kl; k++) {
                            var activity = block.activities[k];
                            if (activity.line) {
                                $scope.activities.matched.push(activity);
                            } else {
                                $scope.activities.unmatched.push(activity);
                            }
                            $scope.unsortedActivities.push(activity);
                        }
                    }
                }
            }
        }

        $scope.matchActivity = function(line) {
            var result = [];
            for (var i = 0, l = $scope.activities.matched.length; i < l; i++) {
                var activity = $scope.activities.matched[i];
                if (activity.line && activity.line === line) {
                    result.push(activity);
                }
            }
            return result;
        };

        $scope.getSumOfActivities = function(line) {
            var total = 0;
            for (var i = 0, l = $scope.activities.matched.length; i < l; i++) {
                var activity = $scope.activities.matched[i];
                if (activity.line && activity.line === line) {
                    total += activity.time;
                }
            }
            return total;
        };

        $scope.getTotalofLines = function(doctype) {
            var value = 0;
            for (var i = 0, l = $scope.newProjects.length; i < l; i++) {
                var project = $scope.newProjects[i];
                for (var j = 0, jl = project[doctype + 's'].length; j < jl; j++) {
                    var document = project[doctype + 's'][j];
                    for (var k = 0, kl = document.lines.length; k < kl; k++) {
                        var line = document.lines[k];
                        if (line.lineType === 'count') {
                            value += line.hours
                        }
                    }
                }
            }
            return value;
        };

        $scope.countJobInLines = function(job, doctype) {
            var value = 0;
            for (var i = 0, l = $scope.newProjects.length; i < l; i++) {
                var project = $scope.newProjects[i];
                for (var j = 0, jl = project[doctype + 's'].length; j < jl; j++) {
                    var document = project[doctype + 's'][j];
                    for (var k = 0, kl = document.lines.length; k < kl; k++) {
                        var line = document.lines[k];
                        if (line.job && line.job === job && line.lineType === 'count') {
                            value += line.hours
                        }
                    }
                }
            }
            return value;
        };

        $scope.countJobInActivities = function(job) {
            var value = 0;
            for (var i = 0, l = $scope.newProjects.length; i < l; i++) {
                var project = $scope.newProjects[i];
                for (var j = 0, jl = project.blocks.length; j < jl; j++) {
                    var block = project.blocks[j];
                    for (var k = 0, kl = block.activities.length; k < kl; k++) {
                        var activity = block.activities[k];
                        if (activity.job && activity.job === job) {
                            value += activity.time;
                        }
                    }
                }
            }
            return value;
        };

        $scope.getTotalOfActivities = function(){
            var total = 0;
            for (var i = 0, l = $scope.unsortedActivities.length; i < l; i++) {
                var activity = $scope.unsortedActivities[i];
                total += activity.time;
            }
            return total;
        };

        $scope.getActivitiesWithoutJob = function() {
            var activities = [];
            for (var i = 0, l = $scope.newProjects.length; i < l; i++) {
                var project = $scope.newProjects[i];
                for (var j = 0, jl = project.blocks.length; j < jl; j++) {
                    var block = project.blocks[j];
                    for (var k = 0, kl = block.activities.length; k < kl; k++) {
                        var activity = block.activities[k];
                        if (!activity.job) {
                            activities.push(activity);
                        }
                    }
                }
            }
            return activities;
        };

        $scope.closeReport = function() {
            $scope.report.open = false;
        };

        $scope.$on('close-popup', function(){
            $scope.closeReport();
        });

    }

    ReportController.$inject = ['$scope'];

    return ReportController;
}); 