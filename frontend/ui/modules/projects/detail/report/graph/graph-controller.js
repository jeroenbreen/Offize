define([], function () {
    "use strict";

    function GraphController($scope) {
        this.$scope = $scope;

        var capacity = ($scope.a - $scope.b) * 100 / $scope.a ;

        if (capacity > 0) {
            $scope.marginLeft = 50 - (capacity / 2);
            $scope.widthLeft = capacity / 2;
            $scope.widthRight = 0;
        } else {
            $scope.marginLeft = 50;
            $scope.widthLeft = 0;
            $scope.widthRight = capacity / -2;
        }



    }

    GraphController.$inject = ['$scope'];

    return GraphController;
}); 