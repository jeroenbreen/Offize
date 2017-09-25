define([
    'ui/ui-tools/common-tools',
    'ui/ui-tools/modal'
], function(
    commonTools,
    modal
) {
    "use strict";
    function ContactDetailController($scope, dataFactory) {
        this.$scope = $scope;
        $scope.commonTools = commonTools;


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
                    dataFactory.delete($.param($scope.model.toBackend())).success(handleSuccess);
                }
            });
        };

        $scope.copySlug = function() {
            commonTools.clipboard($scope.model.toSlug());
        };
    }

    ContactDetailController.$inject = ['$scope', 'dataFactory'];

    return ContactDetailController;
}); 