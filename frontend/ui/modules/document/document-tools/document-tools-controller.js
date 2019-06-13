define([
    'models/Mail',
    'ui/ui-tools/modal',
    'ui/ui-tools/date-tool'
], function (
    Mail,
    modal,
    dateTool
) {
    "use strict";

    function DocumentToolsController($scope, $http, dataFactory, office) {
        this.$scope = $scope;

        $scope.print = function() {
            $http.post('print/print-adapter.php', {
                'data' : $scope.document.toPrint()
            }).success(function(data, status, headers, config) {
                window.open(window.config.printLocation + data);
            }).error(function(data, status, headers, config) { });
        };

        $scope.mail = function() {
            var mail = {
                id: null,
                subject: $scope.document.getPrefix() + ' voor de werkzaamheden m.b.t. ' + $scope.document.title,
                content: 'Beste ' + $scope.document.contactName + ',\n\nBijgeleverd de ' + $scope.document.getPrefix().toLowerCase() + ' voor de werkzaamheden  m.b.t. ' + $scope.document.title + '.\n\n',
                member_id: $scope.document.member.memberId,
                sender: $scope.document.member.email,
                receiver: $scope.document.contact.email,
                date: dateTool.toBackendString(new Date()),
                mailType: 'invoice'
            };

            office.status.mailPopup.active = true;
            office.status.mailPopup.mail = new Mail(mail);
        };

        $scope.lock = function () {
            $scope.document.locked = !$scope.document.locked;
            $scope.update();
        };

        $scope.delete = function() {
            var name, message, successCallback, confirmCallback;

            name = $scope.document.getPrefix() + ' ' + $scope.document.toSlug();
            message = 'Wil je ' + name + ' echt verwijderen?';
            successCallback = function(data, status) {
                var successMessage = name + ' verwijderd';
                modal.show(successMessage, false);
                removeFromOffice();
                removeFromProject();
                $scope.$parent.closeDocument();
            };

            function removeFromOffice() {
                var index = office.documents.indexOf($scope.document);
                office.documents.splice(index, 1);
            }

            function removeFromProject() {
                var index = $scope.project[$scope.document.doctype + 's'].indexOf($scope.document);
                $scope.project[$scope.document.doctype + 's'].splice(index, 1);
            }

            confirmCallback = function() {
                $scope.$apply();
                dataFactory.delete($.param($scope.document.toBackend())).success(successCallback);
            };

            modal.confirm(message, function(result){
                if (result) {
                    confirmCallback();
                }
            });
        };

        $scope.update = function() {
            $scope.$parent.updateDocument();
        };

    }

    DocumentToolsController.$inject = ['$scope', '$http', 'dataFactory', 'office'];

    return DocumentToolsController;
}); 