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

        $scope.$on('bootstrap', function(){
            $scope.members = $scope.model.members.slice();
            $scope.members.unshift(filterMemberAllOption);
            $scope.current = $scope.members[0];
        })
    }

    MemberFilterController.$inject = ['$scope'];

    return MemberFilterController;
}); 