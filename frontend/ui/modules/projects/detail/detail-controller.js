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
    function DetailController($scope, $localStorage, dataFactory) {
        this.$scope = $scope;
        $scope.commonTools = commonTools;

        $scope.report = {
            open: false
        };

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

        $scope.openReport = function() {
            $scope.report.open = true;
        };

        $scope.archiveProject = function() {
            $scope.project.projectStatus = 5;
            $scope.updateProject();
        };

        $scope.deArchiveProject = function() {
            $scope.project.projectStatus = 0;
            $scope.updateProject();
        };

        $scope.copySlug = function() {
            commonTools.clipboard($scope.project.toSlug());
        };

        $scope.addDocument = function(doctype) {
            var date, data, document, successCallback;
            date = new Date();
            data = {
                id: null,
                projectId: $scope.project.projectId,
                doctype: doctype,
                memberId: $scope.project.member.memberId,
                title: $scope.project.projectName,
                nr: $scope.office.getDocumentNumber(doctype),
                contactName: $scope.project.contact.contactPerson,
                contactId: $scope.project.contact.contactId,
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                day: date.getDate(),
                vat: 21,
                currency: 'EUR',
                paid: false,
                locked: false,
                english: false,
                hideTotal: false,
                rate: $scope.project.contact.rate,
                lines: []
            };
            document = new Document(data);

            successCallback = function(response, status) {
                document.id = response.id;
                $scope.project[doctype + 's'].push(document);
                $scope.office.documents.push(document);
                $scope.office.currentDocument = document;
                modal.show(response.message, false);
            };

            dataFactory.create($.param(document.toBackend())).success(successCallback);
        };

        $scope.updateProject = function() {
            $scope.$emit('update-project', $scope.project);
        };

        $scope.selectDocument = function(document) {
            $scope.office.currentDocument = document;
            $localStorage.office.currentDocument = document.id;
        }
    }

    DetailController.$inject = ['$scope', '$localStorage', 'dataFactory'];

    return DetailController;
}); 