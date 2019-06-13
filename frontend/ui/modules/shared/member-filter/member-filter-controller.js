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
                $scope.members = $scope.office.members.slice();
                $scope.members.unshift(filterMemberAllOption);
                $scope.current = $scope.members[0];
            }
        })
    }

    MemberFilterController.$inject = ['$scope', 'office'];

    return MemberFilterController;
}); 