define([], function () {
    "use strict";

    function ClockController($scope) {
        this.$scope = $scope;

    }

    ClockController.$inject = ['$scope'];

    return ClockController;
}); 