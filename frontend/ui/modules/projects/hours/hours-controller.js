define([
    '../../../ui-tools/common-tools',
    '../../../ui-tools/date-tool',
    '../../../ui-tools/modal'
], function(
    commonTools,
    dateTool,
    modal
) {
    "use strict";
    function HoursController($scope, dataFactory) {
        this.$scope = $scope;

        $scope.newHour = emptyHour();

        $scope.addHour = function() {
            var message;
            if ($scope.newHour.description !== '') {
                var handleSuccess = function(response, status) {
                    $scope.office.importHour($scope.newHour);
                    $scope.newHour = emptyHour();
                    modal.show(response, false);
                };
                $scope.newHour.date = new Date();
                $scope.newHour.projectId = $scope.model.projectId;
                dataFactory.add(commonTools.param($scope.newHour)).success(handleSuccess);
            } else {
                message = 'Vul wat in.';
                modal.show(message, true);
            }
        };

        $scope.removeHour = function(hour) {
            var message = 'Wil je ' + hour.description + ' echt verwijderen?',
                handleSuccess = function(response, status) {
                    hour.remove();
                    modal.show(response, false)
                };
            modal.confirm(message, function(result){
                if (result) {
                    dataFactory.remove(commonTools.param(hour)).success(handleSuccess);
                }
            });
        };

        $scope.formateDate = function(date) {
            return dateTool.toString(date);
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