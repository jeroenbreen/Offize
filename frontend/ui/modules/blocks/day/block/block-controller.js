define([], function () {
    "use strict";

    function BlockController($scope, dataFactory) {
        this.$scope = $scope;

        $scope.openBlock = function() {
            $scope.$emit('open-block', $scope.block);
        };

        $scope.updateClock = function(clock) {
            $scope.$emit('update-clock', clock);
        };

    }

    BlockController.$inject = ['$scope', 'dataFactory'];

    return BlockController;
}); 