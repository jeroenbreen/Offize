define([
    'ui/ui-tools/modal'
], function (
    modal
) {
    "use strict";

    function DocumentToolsController($scope, $http, dataFactory, office) {
        this.$scope = $scope;

        $scope.printFile = function() {
            $http.post('print/print-adapter.php', {
                'data' : $scope.document.toPrint()
            }).success(function(data, status, headers, config) {
                window.open(window.config.printLocation + data);
            }).error(function(data, status, headers, config) { });
        };

        $scope.lockFile = function () {
            $scope.document.locked = !$scope.document.locked;
            $scope.update();
        };

        $scope.removeDocument = function() {
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