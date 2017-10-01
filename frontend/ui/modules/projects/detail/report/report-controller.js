define([], function () {
    "use strict";

    function ReportController($scope) {
        this.$scope = $scope;

        $scope.getTitle = function() {
            return $scope.projects.length > 1 ? $scope.projects.length + ' Opdrachten' : $scope.projects[0].projectName;
        };

        $scope.getSetHours = function() {
            var hours = 0;
            for (var i = 0, l = $scope.projects.length; i < l; i++) {
                var project = $scope.projects[i];
                hours += project.hours;
            }
            return hours;
        };

        $scope.getLines = function(doctype) {
            var lines = [];
            for (var i = 0, l = $scope.projects.length; i < l; i++) {
                var project = $scope.projects[i];
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

        $scope.getTotal = function(doctype, subject) {
            var value = 0;
            for (var i = 0, l = $scope.projects.length; i < l; i++) {
                var project = $scope.projects[i];
                for (var j = 0, jl = project[doctype + 's'].length; j < jl; j++) {
                    var document = project[doctype + 's'][j];
                    for (var k = 0, kl = document.lines.length; k < kl; k++) {
                        var line = document.lines[k];
                        if (subject === 'hours' && line.lineType === 'count') {
                            value += line.hours
                        } else {
                            if (line.lineType === 'amount' || line.lineType === 'count') {
                                value += line.getAmount();
                            }
                        }
                    }
                }
            }
            return value;
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