define([], function () {
    "use strict";

    function BlockController($scope) {
        this.$scope = $scope;

    }

    BlockController.$inject = ['$scope'];

    return BlockController;
}); 