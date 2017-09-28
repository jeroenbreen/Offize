define([], function () {
    "use strict";

    function ClockController($scope) {
        this.$scope = $scope;

        $scope.currentProject = null;

        $scope.getLines = function() {
            var lines = [];
            for (var i = 0, l = $scope.currentProject.quotations.length; i < l; i++) {
                var quotation = $scope.currentProject.quotations[i];
                for (var j = 0, jl = quotation.lines.length; j < jl; j++) {
                    var line = quotation.lines[j];
                    if (line.lineType === 'count' || line.lineType === 'amount') {
                        lines.push(line);
                    }
                }
            }
            return lines;
        }

    }

    ClockController.$inject = ['$scope'];

    return ClockController;
}); 