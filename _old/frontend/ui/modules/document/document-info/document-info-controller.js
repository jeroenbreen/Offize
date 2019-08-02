define([], function () {
    "use strict";

    function DocumentInfoController($scope) {
        this.$scope = $scope;

        $scope.months = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];

        $scope.update = function() {
            $scope.$parent.updateDocument();
        };

    }

    DocumentInfoController.$inject = ['$scope'];

    return DocumentInfoController;
}); 