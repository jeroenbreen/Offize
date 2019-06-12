define([
    'ui/ui-tools/common-tools'
], function (
    commonTools
) {
    "use strict";

    function ProjectSumsController($scope, office) {
        this.$scope = $scope;
        $scope.office = office;
        $scope.commonTools = commonTools;

        $scope.sumOfTotals = function() {
            // var sum = 0;
            // for (var i = 0, l = totals.length; i < l; i++) {
            //     sum += totals[i];
            // }
            // return sum;
            return 0;
        };

    }

    ProjectSumsController.$inject = ['$scope', 'office'];

    return ProjectSumsController;
}); 