define([
    'ui/ui-tools/common-tools',
    'ui/ui-tools/delay-tool',
    'ui/ui-tools/modal'
], function(
    commonTools,
    delayTool,
    modal
) {
    "use strict";
    function ContactDetailController($scope, api) {
        this.$scope = $scope;
        $scope.commonTools = commonTools;

        $scope.updateContact = function() {
            function update() {
                var handleSuccess = function(response, status) {
                    modal.show(response, false);
                };
                api.update($.param($scope.model.toBackend())).success(handleSuccess);
            }

            delayTool.delay(update);
        };




        $scope.removeContact = function() {
            var message = 'Wil je ' + $scope.model.name + ' echt verwijderen?',
                handleSuccess = function(data, status) {
                    var successMessage = $scope.model.name + ' verwijderd';
                    var index = $scope.office.contacts.indexOf($scope.model);
                    $scope.office.contacts.splice(index, 1);
                    $scope.office.currentContact = null;
                    modal.show(successMessage, false)
                };
            modal.confirm(message, function(result){
                if (result) {
                    api.delete($.param($scope.model.toBackend())).success(handleSuccess);
                }
            });
        };

        $scope.copySlug = function() {
            commonTools.clipboard($scope.model.toSlug());
        };
    }

    ContactDetailController.$inject = ['$scope', 'api'];

    return ContactDetailController;
}); 