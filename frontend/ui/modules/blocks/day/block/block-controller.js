define([], function () {
    "use strict";

    function BlockController($scope, dataFactory) {
        this.$scope = $scope;

        $scope.openBlock = function() {
            $scope.$emit('open-block', $scope.block);
        };

        $scope.updateActivity = function(activity) {
            $scope.$emit('update-activity', activity);
        };

        $scope.updateBlock = function() {
            $scope.$emit('update-block', $scope.block);
        };
    }

    BlockController.$inject = ['$scope', 'dataFactory'];

    return BlockController;
}); 