define([], function () {
    "use strict";

    function MembersController($scope, office) {
        this.$scope = $scope;
        $scope.office = office;

        $scope.close = function() {
            office.status.membersPopup.active = false;
        }
    }

    MembersController.$inject = ['$scope', 'office'];

    return MembersController;
}); 