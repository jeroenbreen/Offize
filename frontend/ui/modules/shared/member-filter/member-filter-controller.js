define([
    'models/Member'
], function (
    Member
) {
    "use strict";

    function MemberFilterController($scope, office) {
        this.$scope = $scope;

        var filterMemberAllOption = new Member({
            memberId: -1,
            name: 'Alle',
            initials: 'Alle'
        });

        $scope.members = [];


        $scope.$watch('office.members.length', function(newVal, oldVal){
            if (office.members.length > 0) {
                $scope.members = office.members.slice();
                $scope.members.unshift(filterMemberAllOption);
                $scope.current = $scope.members[0];
            }
        })
    }

    MemberFilterController.$inject = ['$scope', 'office'];

    return MemberFilterController;
}); 