define([
    '../../../ui-tools/common-tools'
], function(
    commonTools
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
                commonTools.show(message, false);
                // resource
                $scope.newHour = cleanHour();
            } else {
                message = 'Vul wat in.';
                commonTools.show(message, true);
            }
        };

        $scope.addHour = function() {
            var message;
            if ($scope.newHour.description !== '') {
                var handleSuccess = function(data, status) {
                    var message = 'Toegevoegd: ' + $scope.newHour.description;
                    $scope.office.importHour($scope.newHour);
                    $scope.newHour = emptyHour();
                    commonTools.show(message, false);
                };
                $scope.newHour.date = new Date().toLocaleString();
                $scope.newHour.projectId = $scope.model.projectId;
                dataFactory.add(commonTools.param($scope.newHour)).success(handleSuccess);
            } else {
                message = 'Vul wat in.';
                commonTools.show(message, true);
            }
        };

        $scope.removeHour = function(hour) {
            var message = 'Wil je ' + hour.description + ' echt verwijderen?',
                handleSuccess = function(data, status) {
                    var successMessage = hour.description + ' verwijderd';
                    hour.remove();
                    commonTools.show(successMessage, false)
                };
            commonTools.confirm(message, function(result){
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