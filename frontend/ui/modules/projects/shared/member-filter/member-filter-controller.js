define([
    'models/Member'
], function (
    Member
) {
    "use strict";

    function MemberFilterController($scope) {
        this.$scope = $scope;

        var filterMemberAllOption = new Member({
            memberId: -1,
            name: 'Alle',
            initials: 'Alle'
        });

        $scope.members = [];


        $scope.$watch('model.members.length', function(newVal, oldVal){
            if (newVal > 0) {
                $scope.members = $scope.model.members.slice();
                $scope.members.unshift(filterMemberAllOption);
            }
        })
    }

    MemberFilterController.$inject = ['$scope'];

    return MemberFilterController;
}); 