define([
    'models/Document',
    'ui/ui-tools/common-tools',
    'ui/ui-tools/modal',
    'jquery'
], function(
    Document,
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

        $scope.deArchiveProject = function() {
            $scope.project.projectStatus = 0;
        };

        $scope.copySlug = function() {
            commonTools.clipboard($scope.project.toSlug());
        };

        $scope.addDocument = function(doctype) {
            var d, data, document, backendDocument, message, successCallback;
            d = new Date();
            data = {
                    id: null,
                    type: 'document',
                    clientName: $scope.project.contact.contactPerson,
                    projectId: $scope.project.projectId,
                    doctype: doctype,
                    currency: $scope.project.currency,
                    english: 0,
                    hideTotal: 0,
                    locked: 0,
                    nr: $scope.office.getHighestNr(doctype),
                    paid: 0,
                    memberId: $scope.project.member.memberId,
                    title: $scope.project.projectName,
                    vat: 21,
                    year: d.getFullYear(),
                    month: d.getMonth() + 1,
                    day: d.getDate(),
                    rate: $scope.project.rate
            };
            document = new Document(data);

            successCallback = function(response, status) {
                document.id = response.id;
                $scope.project[doctype + 's'].push(document);
                $scope.office.currentDocument = document;
                modal.show(response.message, false);
            };

            dataFactory.create($.param(data)).success(successCallback);
        };
    }

    DetailController.$inject = ['$scope', 'dataFactory'];

    return DetailController;
}); 