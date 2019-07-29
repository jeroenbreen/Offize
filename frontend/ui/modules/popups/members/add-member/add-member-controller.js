define([
    'models/Member',
    'ui/ui-tools/modal',
    'jquery'
], function (
    Member,
    modal,
    $
) {
    "use strict";

    function AddMemberController($scope, api, office) {
        this.$scope = $scope;

        $scope.member = new Member();

        $scope.create = function() {
            var message, data;

            function handleSuccess(response) {
                message = 'Toegevoegd: ' + $scope.member.name;
                data.memberId = response.memberId;
                office.members.push(new Member(data));
                modal.show(message, false);
                $scope.member = new Member();
            }

            if ($scope.member.name) {
                data = $scope.member.toBackend();
                api.create($.param(data)).success(handleSuccess);
            } else {
                message = 'Vul een naam in.';
                modal.show(message, true);
            }
        };

    }

    AddMemberController.$inject = ['$scope', 'api', 'office'];

    return AddMemberController;
}); 