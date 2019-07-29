define([
    'ui/ui-tools/modal',
    'ui/ui-tools/delay-tool'
], function (
    modal,
    delayTool
) {
    "use strict";

    function MemberController($scope, api, office, $sce) {
        this.$scope = $scope;

        $scope.trustAsHtml = function(content) {
            return $sce.trustAsHtml(content);
        };

        $scope.update = function() {
            function handleSuccess(response, status) {
                modal.show(response, false);
            }

            function update() {
                api.update($.param($scope.member.toBackend())).success(handleSuccess);
            }

            delayTool.delay(update);
        };

        $scope.remove = function() {
            var message = 'Wil je ' + $scope.member.name + ' echt verwijderen?';

             function handleSuccess(data, status) {
                var successMessage, index;
                 successMessage = $scope.member.name + ' verwijderd';
                index = office.members.indexOf($scope.member);
                office.members.splice(index, 1);
                modal.show(successMessage, false)
            }

            modal.confirm(message, function(result){
                if (result) {
                    api.delete($.param($scope.member.toBackend())).success(handleSuccess);
                }
            });
        };

    }

    MemberController.$inject = ['$scope', 'api', 'office', '$sce'];

    return MemberController;
}); 