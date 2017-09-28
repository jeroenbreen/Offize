define([], function () {
    "use strict";

    function JobSelectorController($scope) {
        this.$scope = $scope;

        $scope.selectJob = function(job) {
            console.log(job);
            $scope.line.job = job;
            console.log($scope.line);
        };

    }

    JobSelectorController.$inject = ['$scope'];

    return JobSelectorController;
}); 