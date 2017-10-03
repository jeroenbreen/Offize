define([], function () {
    "use strict";

    function ActivityController($scope) {
        this.$scope = $scope;


        $scope.getLines = function() {
            var lines = [];
            if ($scope.project) {
                for (var i = 0, l = $scope.project.quotations.length; i < l; i++) {
                    var quotation = $scope.project.quotations[i];
                    for (var j = 0, jl = quotation.lines.length; j < jl; j++) {
                        var line = quotation.lines[j];
                        if (line.lineType === 'count' || line.lineType === 'amount') {
                            lines.push(line);
                        }
                    }
                }
            }
            return lines;
        };

        $scope.limitString = function(string) {
            var limitString = 28;
            if (string.length > limitString) {
                return string.substr(0,limitString) + '...'
            } else {
                return string;
            }
        };

        $scope.pickDetail = function() {
            if ($scope.activity.line.job) {
                $scope.activity.job = $scope.activity.line.job;
            }
        };

        $scope.updateActivity = function(){
            $scope.$emit('update-activity', $scope.activity);
        };
    }

    ActivityController.$inject = ['$scope'];

    return ActivityController;
}); 