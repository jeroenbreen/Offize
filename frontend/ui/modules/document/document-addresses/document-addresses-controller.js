define([], function () {
    "use strict";

    function DocumentAddressesController($scope, office) {
        this.$scope = $scope;

        $scope.office = office;
    }

    DocumentAddressesController.$inject = ['$scope', 'office'];

    return DocumentAddressesController;
}); 