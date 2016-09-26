define([
    '../../../ui-tools/common-tools',
    '../../../ui-tools/modal'
], function(
    commonTools,
    modal
) {
    "use strict";
    function HoursController($scope, dataFactory) {
        this.$scope = $scope;

        $scope.newHour = emptyHour();

        $scope.addHour = function() {
            var message;
            if ($scope.newHour.description !== '') {
                $scope.newHour.date = new Date().toLocaleString();
                $scope.newHour.projectId = $scope.model.projectId;
                $scope.office.importHour($scope.newHour);
                message = 'added hour...';
                modal.show(message, false);
                // resource
                $scope.newHour = cleanHour();
            } else {
                message = 'Vul wat in.';
                modal.show(message, true);
            }
        };

        $scope.addHour = function() {
            var message;
            if ($scope.newHour.description !== '') {
                var handleSuccess = function(data, status) {
                    var message = 'Toegevoegd: ' + $scope.newHour.description;
                    $scope.office.importHour($scope.newHour);
                    $scope.newHour = emptyHour();
                    modal.show(message, false);
                };
                $scope.newHour.date = new Date().toLocaleString();
                $scope.newHour.projectId = $scope.model.projectId;
                dataFactory.add(commonTools.param($scope.newHour)).success(handleSuccess);
            } else {
                message = 'Vul wat in.';
                modal.show(message, true);
            }
        };

        $scope.removeHour = function(hour) {
            var message = 'Wil je ' + hour.description + ' echt verwijderen?',
                handleSuccess = function(data, status) {
                    var successMessage = hour.description + ' verwijderd';
                    hour.remove();
                    modal.show(successMessage, false)
                };
            modal.confirm(message, function(result){
                if (result) {
                    dataFactory.remove(commonTools.param(hour)).success(handleSuccess);
                }
            });
        };

        function emptyHour() {
            return {
                description : '',
                date : '',
                time : 0,
                memberId : null,
                type : 'hours'
            }
        }
    }

    HoursController.$inject = ['$scope', 'dataFactory'];

    return HoursController;
}); 