define([
    '../../../ui-tools/common-tools'
], function(
    commonTools
) {
    "use strict";
    function DetailController($scope, dataFactory) {
        this.$scope = $scope;

        $scope.status = ['Pijplijn', 'Offerte', 'Lopend', 'Factuur', 'Betaald', 'Dood'];

        $scope.removeProject = function() {
            var message = 'Wil je ' + $scope.model.projectName + ' echt verwijderen?',
                handleSuccess = function(data, status) {
                    var successMessage = $scope.model.projectName + ' verwijderd';
                    $scope.model.remove();
                    commonTools.show(successMessage, false)
                };
            commonTools.confirm(message, function(result){
                if (result) {
                    dataFactory.remove(commonTools.param($scope.model)).success(handleSuccess);
                }
            });
        };

        $scope.addDocument = function(type) {
            var d = new Date(),
                year = d.getFullYear(),
                newDocument,
                contact = $scope.office.getContactById($scope.model.contactId),
                typeNl = (type === 'invoices' ? 'Factuur' : 'Offerte');
            newDocument = {
                type : typeNl,
                jaar : year,
                datum : {
                    j : year,
                    m : d.getMonth() + 1,
                    d : d.getDate()
                },
                klant : {
                    naam : contact.name,
                    contact : contact.contactPerson,
                    adres : contact.street,
                    postcode : contact.zipcode + ' ' + contact.city
                },
                bedrijf : {
                    naam : $scope.office.configuration.companyName,
                    contact : $scope.office.getMemberById($scope.model.memberId).name,
                    adres : $scope.office.configuration.companyAddress,
                    postcode : $scope.office.configuration.companyZipcode + ' ' + $scope.office.configuration.companyCity
                },
                currency : $scope.model.currency,
                rate : $scope.model.rate,
                omschrijving : $scope.model.projectName,
                posten : [],
                betaald : false,
                nr : $scope.office.getHighestNr(type)
            };
            $scope.office.currentDocument = $scope.model.importDocument(newDocument, type);

        };

    }

    DetailController.$inject = ['$scope', 'dataFactory'];

    return DetailController;
}); 