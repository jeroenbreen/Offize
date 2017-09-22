define([
    'ui/ui-tools/common-tools',
    'ui/ui-tools/modal',
    'jquery'
], function(
    commonTools,
    modal,
    $
) {
    "use strict";
    function DetailController($scope, dataFactory) {
        this.$scope = $scope;
        $scope.commonTools = commonTools;

        $scope.status = ['Pijplijn', 'Offerte', 'Lopend', 'Factuur', 'Betaald', 'Gearchiveerd'];

        $scope.removeProject = function() {
            var message = 'Wil je ' + $scope.project.projectName + ' echt verwijderen?',
                handleSuccess = function(data, status) {
                    var successMessage = $scope.project.projectName + ' verwijderd',
                        index = $scope.office.projects.indexOf($scope.project);
                    $scope.office.projects.splice(index, 1);
                    $scope.office.currentProject = null;
                    modal.show(successMessage, false)
                };
            modal.confirm(message, function(result){
                if (result) {
                    dataFactory.delete($.param($scope.project.toBackend())).success(handleSuccess);
                }
            });
        };

        $scope.archiveProject = function() {
            $scope.project.projectStatus = 5;
        };

        $scope.reviveProject = function() {
            $scope.project.projectStatus = 0;
        };

        $scope.dearchiveProject = function() {
            $scope.project.projectStatus = 0;
        };

        $scope.copySlug = function() {
            commonTools.clipboard(commonTools.toSlug($scope.project.contact.getNumber(), $scope.project.projectName));
        };

        $scope.addDocument = function(type) {
            var d = new Date(),
                year = d.getFullYear(),
                newDocument,
                contact = $scope.office.getContactById($scope.project.contactId),
                typeNl = (type === 'invoices' ? 'Factuur' : 'Offerte');
            newDocument = {
                type : typeNl,
                year : year,
                date : {
                    year : year,
                    month : d.getMonth() + 1,
                    day : d.getDate()
                },
                client : {
                    name : contact.name,
                    contactPerson : contact.contactPerson,
                    address : contact.street,
                    zipcode : contact.zipcode + ' ' + contact.city
                },
                sender : {
                    name : $scope.office.configuration.companyName,
                    contactPerson : $scope.office.getMemberById($scope.project.memberId).name,
                    address : $scope.office.configuration.companyAddress,
                    zipcode : $scope.office.configuration.companyZipcode + ' ' + $scope.office.configuration.companyCity
                },
                currency : $scope.project.currency,
                rate : $scope.project.rate,
                title : $scope.project.projectName,
                lines : [],
                paid : false,
                nr : $scope.office.getHighestNr(type)
            };
            $scope.office.currentDocument = $scope.project.importDocument(newDocument, type);

        };
    }

    DetailController.$inject = ['$scope', 'dataFactory'];

    return DetailController;
}); 