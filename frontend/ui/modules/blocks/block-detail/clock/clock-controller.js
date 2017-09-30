define([], function () {
    "use strict";

    function ClockController($scope) {
        this.$scope = $scope;

        $scope.currentProject = null;
        $scope.currentLine = null;
        $scope.currentJob = null;


        $scope.getLines = function() {
            var lines = [];
            for (var i = 0, l = $scope.clock.project.quotations.length; i < l; i++) {
                var quotation = $scope.clock.project.quotations[i];
                for (var j = 0, jl = quotation.lines.length; j < jl; j++) {
                    var line = quotation.lines[j];
                    if (line.lineType === 'count' || line.lineType === 'amount') {
                        lines.push(line);
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

        $scope.updateClock = function(){
            $scope.$emit('update-clock', $scope.clock);
        };


    }

    ClockController.$inject = ['$scope'];

    return ClockController;
}); 