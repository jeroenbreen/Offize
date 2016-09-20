define([
    '../../../ui-tools/common-tools',
    '../../../ui-tools/modal'
], function(
    commonTools,
    modal
) {
    "use strict";
    function ContactDetailController($scope, dataFactory) {
        this.$scope = $scope;


        $scope.removeContact = function() {
            var message = 'Wil je ' + $scope.model.name + ' echt verwijderen?',
                handleSuccess = function(data, status) {
                    var successMessage = $scope.model.name + ' verwijderd';
                    $scope.model.remove();
                    modal.show(successMessage, false)
                };
            modal.confirm(message, function(result){
                if (result) {
                    dataFactory.remove(commonTools.param($scope.model)).success(handleSuccess);
                }
            });
        };
    }

    ContactDetailController.$inject = ['$scope', 'dataFactory'];

    return ContactDetailController;
}); 